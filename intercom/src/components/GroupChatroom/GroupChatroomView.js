import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '../../host';

import UnAuth from '../UnAuth/UnAuth';
import Error from '../Error/Error';
import GroupChatroomActivities from './GroupChatroomActivities';
import GroupChatroomCall from './GroupChatroomCall';
import DeleteModal from '../Modal/DeleteModal';
import Footer from '../LandingPage/Footer';


class GroupChatroomView extends Component {
    state = {
        userId: localStorage.getItem('userId'),
        user: {},
        groupId: this.props.match.params.id,
        group: {},
        groupName: '',
        activities: [],
        // participants: [],
        isOwner: false,
        unAuth: false,
        error: false,
    }

    componentDidMount = () => {
        this.checkIfUnAuth()
        this.getUser(this.state.userId);

        const id = this.state.groupId;
        this.getGroup(id);
        this.getActivities(id);
        // this.getParticipants(id);
        this.checkIfOwner(id);
    }

    checkIfUnAuth = () => {
        const groupId = parseInt(this.state.groupId) 
        const userId = localStorage.getItem('userId')
        axios
            .get(`${host}/api/users/${userId}/groupsBelongedTo`)
            .then(res => {
                const groupIds = res.data.map(group => group.groupId)
                if (!groupIds.includes(groupId)){
                    this.setState({ unAuth: true })
                }
            })
            .catch(err => {
                this.setState({ error: {code: err.response.status, message: err.response.statusText} })
            });         
    }

    getUser = id => {
        axios
            .get(`${host}/api/users/${id}`)
            .then(res => this.setState({ user: res.data }))
            .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    }

    // updateUser = changes => {
    //     const id = this.state.userId;
    //     const userById = `${host}/api/users/${id}`;
    //     this.axiosPut(userById, 'user', changes);
    // }

    getGroup = id => {
        axios
            .get(`${host}/api/groups/${id}`)
            .then(res => this.setState({ group: res.data }))
            .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    }

    updateGroup = changes => {
        const id = this.state.groupId;
        const originalGroupName = this.state.group.name;
        // First Update Group
        axios
            .put(`${host}/api/groups/${id}`, changes)
            .then(res => {
                // Update Group state and Add to activities
                this.setState({ group: res.data })
                const activity = { userId: this.state.userId, activity: `Updated group name from ${originalGroupName} to ${res.data.name}.` }
                axios
                    .post(`${host}/api/groups/${id}/activities`, activity)
                    .then(res => this.setState({ activities: res.data }))
                    .catch(() => this.getActivities()) // If error posting get original activities
            })
            // If error updating still want to try and get original group information
            .catch(() => this.getGroup(id))
    }

    deleteGroup = () => {
        const groupId = this.state.groupId;
        const userId = this.state.userId;
        // First get any active call participants
        axios
        .get(`${host}/api/groups/${groupId}/callParticipants`)
        .then(res => {
            // If no active participants go right to delete
            if (res.data.length === 0) {
                axios
                .delete(`${host}/api/groups/${groupId}`)
                .then(() => this.props.history.push(`/user/${userId}`) ) // Go back to user main view
                .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
            } else {
                // If call participants, update user's call status to false
                let updatedCallParticipants = 0;
                res.data.forEach( user => {
                    axios
                    .put(`${host}/api/users/${user.userId}`, { callStatus: false })
                    .then(() => {
                        updatedCallParticipants++
                        // Once all participants updated, then delete group
                        if (updatedCallParticipants === res.data.length) { 
                            axios
                            .delete(`${host}/api/groups/${groupId}`)
                            .then(() => this.props.history.push(`/user/${userId}`) ) // Go back to user main view
                            .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
                        } 
                    })
                    .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
                })
            }
        })
        .catch(() => this.getGroup())
    }

    leaveGroup = () => {
        const groupId = this.state.groupId;
        const userId = this.state.userId;
        // First delete member and throw error if not able
        axios
        .delete(`${host}/api/groups/${groupId}/groupMembers/${userId}`)
        // If deleted update group activities in db
        .then(() => {
            const activity = { userId: userId, activity: `Left group.` }
            axios
            .post(`${host}/api/groups/${groupId}/activities`, activity)
            .then(() => this.props.history.push(`/user/${userId}`)) // once activity db updated send user back to main page
            .catch(() => this.getActivities()) // If error posting get origin activities
        })
        .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    }

    getActivities = id => {
        axios
            .get(`${host}/api/groups/${id}/activities`)
            .then(res => this.setState({ activities: res.data }))
            .catch(() => this.setState({ activities: [] }))
    }

    // addActivity = activityComment => {
    //     const id = this.state.groupId;
    //     const activity = { userId: this.state.userId, activity: activityComment }
    //     axios
    //         .post(`${host}/api/groups/${id}/activities`, activity)
    //         .then(res => this.setState({ activities: res.data }))
    //         .catch(() => this.getActivities()) // If error posting get origin activities
    // }

    // getParticipants = id => {
    //     axios
    //         .get(`${host}/api/groups/${id}/callParticipants`)
    //         .then(res => this.setState({ participants: res.data }))
    //         .catch(() => this.setState({ participants: [] }))
    // }

    // addParticipant = () => {
    //     const id = this.state.groupId;
    //     const participants = `${host}/api/groups/${id}/callParticipants`;
    //     const userId = { userId: this.state.userId }
    //     this.axiosPost(participants, 'participants', userId);
    // }

    // deleteParticipant = (userId) => {
    //     const id = this.state.groupId;
    //     const participants = `${host}/api/groups/${id}/callParticipants/${userId}`;
    //     this.axiosDel(participants, 'participants')
    // }

    checkIfOwner = id => {
        const userId = parseInt(localStorage.getItem('userId'));
        axios
            .get(`${host}/api/groups/${id}/groupOwners`)
            .then(res => {
                res.data[0].userId === userId 
                ? this.setState({ isOwner: true })
                : this.setState({ isOwner: false })               
            })
            .catch(() => this.setState({ isOwner: false }))
    }

    // axiosGet = async (call, key) => {
    //     try {
    //         const res = await axios.get(call)
    //         this.setState({ [key]: res.data })
    //     } catch (err) {
    //         this.setState({ error: err.response.data.message })
    //     }
    // }

    // axiosPost = async (call, key, post) => {
    //     try {
    //         const res = await axios.post(call, post)
    //         this.setState({ [key]: res.data })
    //         if (res.data.length > 0) {return true}
    //     } catch (err) {
    //         this.setState({ error: err.response.data.message })
    //     }
    // }

    // axiosPut = async (call, key, changes) => {
    //     try {
    //         const res = await axios.put(call, changes)
    //         this.setState({ [key]: res.data })
    //     } catch (err) {
    //         this.setState({ error: err.response.data.message })
    //     }
    // }

    // axiosDel = async (call, key) => {
    //     try {
    //         const res = await axios.delete(call)
    //         this.setState({ [key]: res.data })
    //         return res.data
    //     } catch (err) {
    //         this.setState({ error: err.response.data.message })
    //     }
    // }

    handleInputChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    handleGroupUpdate = e => {
        e.preventDefault()
        this.updateGroup({ name: this.state.groupName })
        this.setState({ groupName: '' })
    }

    // handleCallButton = async () => {
    //     const userOnCall = (this.state.user.callStatus === true)
    //     const groupOnCall = (this.state.group.callStatus === true)
    //     // TWILIO CODE HERE FOR PHONE NUMBER
    //     const phoneNumber = '+15555555555'

    //     switch (true) {
    //         case (!userOnCall && !groupOnCall): // Start Call
    //             this.updateUser({ callStatus: true });
    //             this.updateGroup({ callStatus: true, phoneNumber });
    //             this.addParticipant();
    //             this.addActivity(`Started Call on ${phoneNumber}`);
    //             break;
    //         case (!userOnCall && groupOnCall): // Join Call
    //             this.updateUser({ callStatus: true });
    //             this.addParticipant();
    //             break;
    //         case (userOnCall && groupOnCall): // Leave Call
    //             this.updateUser({ callStatus: false });
    //             const participants = await this.deleteParticipant(this.state.userId);
    //             if (participants === undefined) { // Terminate Call: if no more particates
    //                 this.addActivity('Ended Call');
    //                 this.updateGroup({ callStatus: false, phoneNumber: null });
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }

    render() {

        let { unAuth, user, group, groupId, groupName, isOwner, activities, error } = this.state

        return (
            <>
                { unAuth ? <UnAuth/> : 
                <>
                { error ? <Error error={error}/> : 
                    <>
                        <section className="container blog page-container">
                                                               
                            <div className="row">
                                <div className="col-md-12 page-header-flex"> 
                                    <div className="page-icon-flex">
                                        <i className="fa fa-users fa-4x"></i>
                                        <h2>{group.name}</h2>
                                    </div>
                                    <Link to={`/group/${groupId}/members`} className='blog-title' style={{textDecoration: 'underline' }}>
                                        <h4>{isOwner ? 'Manage Members' : 'View Members'}</h4>
                                    </Link>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">     
                                    <GroupChatroomCall groupId={this.props.match.params.id} />
                                        {/* // group={group}
                                        // participants={participants}
                                        // user={user}
                                        // handleCallButton={this.handleCallButton}
                                    // /> */}

                                    <GroupChatroomActivities activities={activities} />
                                </div>

                                <aside className="col-md-4 sidebar-padding">
                                    <div className="blog-sidebar">
                                        <h3 className="sidebar-title">Group Settings</h3>
                                        <hr></hr>
                                        {isOwner ? 
                                        <>
                                            <h4 className="sidebar-title">Update Group Name: </h4>
                                            <div className="input-group">
                                                <input
                                                    className='form-control'
                                                    onChange={this.handleInputChange}
                                                    type='text'
                                                    id='groupName'
                                                    name='groupName'
                                                    value={this.state.groupName}
                                                    placeholder='New Name...'
                                                >
                                                </input>
                                                <span className="input-group-btn">
                                                    {groupName === ""
                                                    ?
                                                    <button className="btn btn-default" type="button" disabled>
                                                        Update
                                                    </button>
                                                    :
                                                    <button className="btn btn-default" type="button" onClick={this.handleGroupUpdate}>
                                                        Update
                                                    </button>
                                                    }
                                                </span>
                                            </div>
                                            <div className="btn-delete-margin">
                                            <DeleteModal 
                                                deleteMessage={"Confirm your email"} 
                                                target={groupId} 
                                                targetName={user.email} 
                                                handleTarget={this.deleteGroup} 
                                                type={'Delete Group'}
                                            />
                                            </div>

                                        </>
                                        : 
                                        <>
                                            <DeleteModal 
                                                deleteMessage={"Confirm the email"} 
                                                target={groupId} 
                                                targetName={user.email} 
                                                handleTarget={this.leaveGroup} 
                                                type={'Leave Group'}
                                             />

                                        </>
                                        }
                                    </div>
                                </aside>

                            </div>

                        </section>

                        <Footer/>

                    </>
                }
                </>}
            </>
        );
    }
}

export default GroupChatroomView;