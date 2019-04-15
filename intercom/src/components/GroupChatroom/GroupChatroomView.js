import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '../../host';
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
        participants: [],
        isOwner: false,
        error: null,
    }

    componentDidMount = () => {
        this.getUser(this.state.userId);

        const id = this.state.groupId;
        this.getGroup(id);
        this.getActivities(id);
        this.getParticipants(id);
        this.checkIfOwner(id);
    }

    getUser = id => {
        const userById = `${host}/api/users/${id}`;
        this.axiosGet(userById, 'user');
    }

    updateUser = changes => {
        const id = this.state.userId;
        const userById = `${host}/api/users/${id}`;
        this.axiosPut(userById, 'user', changes);
    }

    getGroup = id => {
        const groupById = `${host}/api/groups/${id}`;
        this.axiosGet(groupById, 'group');
    }

    updateGroup = changes => {
        const id = this.state.groupId;
        const groupById = `${host}/api/groups/${id}`;
        this.axiosPut(groupById, 'group', changes);
    }

    deleteGroup = () => {
        const id = this.state.groupId;
        const userId = localStorage.getItem('userId')
        axios.get(`${host}/api/groups/${id}/callParticipants`)
            .then(res => {
                // If call participants, update call status to false for all participants then delete group
                let updatedCallParticipants = 0;
                res.data.forEach( user => {
                    axios.put(`${host}/api/users/${user.userId}`, { callStatus: false })
                        .then(() => {
                            updatedCallParticipants++
                            if (updatedCallParticipants === res.data.length) {
                                // Delete Group
                                axios.delete(`${host}/api/groups/${id}`)
                                    // Go back to user main view
                                    .then(() => this.props.history.push(`/user/${userId}`) )
                                    .catch(err => console.log(err))
                            } 
                        })
                        .catch(err => console.log(err))
                })
                // If no participants go right to delete
                if (updatedCallParticipants === res.data.length) {
                    // Delete Group
                    axios.delete(`${host}/api/groups/${id}`)
                        // Go back to user main view
                        .then(() => this.props.history.push(`/user/${userId}`) )
                        .catch(err => console.log(err))
                } 
            })
            .catch(err => console.log(err))
    }

    leaveGroup = async () => {
        const addedActivity = await this.addActivity(`Left Group`);
        if(addedActivity) {
            const id = this.state.groupId;
            const member = `${host}/api/groups/${id}/groupMembers/${this.state.userId}`;
            const res = await this.axiosDel(member, 'user')
            if (res) {
                const userId = localStorage.getItem('userId')
                this.props.history.push(`/user/${userId}`)
            }  
        }
    }

    getActivities = id => {
        const activities = `${host}/api/groups/${id}/activities`;
        this.axiosGet(activities, 'activities');
    }

    addActivity = async (activityComment) => {
        const id = this.state.groupId;
        const activities = `${host}/api/groups/${id}/activities`;
        const activity = { userId: this.state.userId, activity: activityComment }
        const posted = await this.axiosPost(activities, 'activities', activity)
        if(posted) {return true}
    }

    getParticipants = id => {
        const participants = `${host}/api/groups/${id}/callParticipants`;
        this.axiosGet(participants, 'participants');
    }

    addParticipant = () => {
        const id = this.state.groupId;
        const participants = `${host}/api/groups/${id}/callParticipants`;
        const userId = { userId: this.state.userId }
        this.axiosPost(participants, 'participants', userId);
    }

    deleteParticipant = (userId) => {
        const id = this.state.groupId;
        const participants = `${host}/api/groups/${id}/callParticipants/${userId}`;
        this.axiosDel(participants, 'participants')
    }

    checkIfOwner = async (id) => {
        const groupOwners = `${host}/api/groups/${id}/groupOwners`;
        const userId = parseInt(localStorage.getItem('userId'));
        try {
            const res = await axios.get(groupOwners)
            res.data[0].userId === userId 
                ? this.setState({ isOwner: true })
                : this.setState({ isOwner: false })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }

    }

    axiosGet = async (call, key) => {
        try {
            const res = await axios.get(call)
            this.setState({ [key]: res.data })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }
    }

    axiosPost = async (call, key, post) => {
        try {
            const res = await axios.post(call, post)
            this.setState({ [key]: res.data })
            if (res.data.length > 0) {return true}
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }
    }

    axiosPut = async (call, key, changes) => {
        try {
            const res = await axios.put(call, changes)
            this.setState({ [key]: res.data })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }
    }

    axiosDel = async (call, key) => {
        try {
            const res = await axios.delete(call)
            this.setState({ [key]: res.data })
            return res.data
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }
    }

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

        let { user, group, groupId, groupName, isOwner, participants, activities, error } = this.state

        return (
            <>
                {error
                    ? <h1>Error retrieving group!</h1>
                    : <>
                        <section className="container blog page-container">
                                                               
                            <div className="row">
                                <div className="col-md-12"> 
                                    <span className="pull-left icon-img-users"><i className="fa fa-users fa-4x"></i></span>
                                    <span className="pull-left">
                                        <h2>{group.name}</h2>
                                    </span>
                                    <span className="pull-right">                                                
                                        <Link to={`/group/${groupId}/members`} className='blog-title' style={{textDecoration: 'underline' }}>
                                        <h4>{isOwner ? 'Manage Members' : 'View Members'}</h4>
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">     
                                    <GroupChatroomCall
                                        user={user}
                                        group={group}
                                        participants={participants}
                                        // handleCallButton={this.handleCallButton}
                                    />

                                    <GroupChatroomActivities
                                        activities={activities}
                                        avatar={user.avatar}
                                    />
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
                                            <DeleteModal 
                                                deleteMessage={"Confirm your group's name to delete your group"} 
                                                target={this.state.groupId} 
                                                targetName={this.state.group.name} 
                                                handleTarget={this.deleteGroup} 
                                                type={'Delete Group'}
                                             />

                                        </>
                                        : 
                                        <>
                                            <DeleteModal 
                                                deleteMessage={"Confirm the group's name to leave the group"} 
                                                target={this.state.groupId} 
                                                targetName={this.state.group.name} 
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
            </>
        );
    }
}

export default GroupChatroomView;