import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import host from '../../host';

import GroupChatroomActivities from './GroupChatroomActivities';
import GroupChatroomCall from './GroupChatroomCall';

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

    deleteGroup = async () => {
        const id = this.state.groupId;
        const groupById = `${host}/api/groups/${id}`;   
        const res = await this.axiosDel(groupById, 'group') 
        if (res.count) {
            const userId = localStorage.getItem('userId')
            this.props.history.push(`/user/${userId}`)
        }   
    }

    leaveGroup = async () => {
        this.addActivity(`Left Group`);
        const id = this.state.groupId;
        const member = `${host}/api/groups/${id}/groupMembers/${this.state.userId}`;
        const res = await this.axiosDel(member, 'user')
        if (res.length === 0) {
            const userId = localStorage.getItem('userId')
            this.props.history.push(`/user/${userId}`)
        }  
    }

    getActivities = id => {
        const activities = `${host}/api/groups/${id}/activities`;
        this.axiosGet(activities, 'activities');
    }

    addActivity = (activityComment) => {
        const id = this.state.groupId;
        const activities = `${host}/api/groups/${id}/activities`;
        const activity = { userId: this.state.userId, activity: activityComment }
        this.axiosPost(activities, 'activities', activity)
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
        try {
            const res = await axios.get(groupOwners)
            res.data.length > 0
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

    handleCallButton = async () => {
        const userOnCall = (this.state.user.callStatus === 1)
        const groupOnCall = (this.state.group.callStatus === 1)
        // TWILIO CODE HERE FOR PHONE NUMBER
        const phoneNumber = '+15555555555'

        switch (true) {
            case (!userOnCall && !groupOnCall): // Start Call
                this.updateUser({ callStatus: true });
                this.updateGroup({ callStatus: true, phoneNumber });
                this.addParticipant();
                this.addActivity(`Started Call on ${phoneNumber}`);
                break;
            case (!userOnCall && groupOnCall): // Join Call
                this.updateUser({ callStatus: true });
                this.addParticipant();
                break;
            case (userOnCall && groupOnCall): // Leave Call
                this.updateUser({ callStatus: false });
                const participants = await this.deleteParticipant(this.state.userId);
                if (participants === undefined) { // Terminate Call: if no more particates
                    this.addActivity('Ended Call');
                    this.updateGroup({ callStatus: false, phoneNumber: null });
                }
                break;
            default:
                break;
        }



    }

    render() {

        let { user, group, groupId, isOwner, participants, activities, error } = this.state

        return (
            <>
                {error
                    ? <p>{error}</p>
                    : <>
                        <h3>{group.name}</h3>
                        <Link to={`/group/${groupId}/members`}>
                            {isOwner ? 'Manage Members' : 'View Members'}
                        </Link>

                        {isOwner ? 
                        <>
                            <button onClick={this.deleteGroup}>
                                Delete Group
                            </button>

                            <form onSubmit={this.handleGroupUpdate}>
                                Update Group Name:
                                <input 
                                    onChange={this.handleInputChange} 
                                    type='text' 
                                    id='groupName'
                                    name='groupName' 
                                    value={this.state.groupName} 
                                    placeholder='New Group Name Here...'
                                ></input>
                                <input type='submit' value='Submit'></input>
                            </form>

                        </>
                        : 
                        <>
                            <button onClick={this.leaveGroup}>
                                Leave Group
                            </button>
                        </>
                        }

                        <GroupChatroomCall
                            user={user}
                            group={group}
                            participants={participants}
                            handleCallButton={this.handleCallButton}
                        />

                        <GroupChatroomActivities
                            activities={activities}
                        />
                    </>
                }
            </>
        )
    }
}

export default GroupChatroomView;