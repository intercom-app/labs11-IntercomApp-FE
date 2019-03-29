import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import host from '../../host';

import GroupChatroomActivities from './GroupChatroomActivities';
import GroupChatroomCall from './GroupChatroomCall';

class GroupChatroomView extends Component {
    state = {
        userId: localStorage.getItem('userId'),
        groupId: this.props.match.params.id,
        group: {},
        activities: [],
        participants: [],
        isOwner: false,
        error: null,
    }

    componentDidMount = async () => {
        const id = this.state.groupId;
        this.getGroup(id);
        this.getActivities(id);
        this.getParticipants(id);
        this.checkIfOwner(id);
    }

    getGroup = id => {
        const groupById = `${host}/api/groups/${id}`;
        this.axiosGet(groupById, 'group')
    }

    getActivities = id => {
        const activities = `${host}/api/groups/${id}/activities`;
        this.axiosGet(activities, 'activities')
    }

    getParticipants = id => {
        const participants = `${host}/api/groups/${id}/callParticipants`;
        this.axiosGet(participants, 'participants')
    }

    checkIfOwner = async (id) => {
        const groupOwners = `${host}/api/groups/${id}/groupOwners`;
        try {
            const res = await axios.get(groupOwners)
            const isOwner = res.data.filter(owner => owner.userId === this.state.userId)
            isOwner.length > 0
                ? this.setState({ isOwner: true })
                : this.setState({ isOwner: false })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }

    }

    axiosGet = async (call, key) => {
        try {
            const res = await axios.get(call)
            this.setState({ [key] : res.data })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }
    }

    render() {

        let { group, groupId, isOwner, participants, error } = this.state

        return (
            <>
                {error
                    ? <p>{error}</p>
                    : <>
                        <h3>{group.name}</h3>
                        <Link to={`/group/${groupId}/members`}>
                            {isOwner ? 'Manage Members' : 'View Members'}
                        </Link>

                        <GroupChatroomCall
                            group={group}
                            participants={participants}
                        />
                        
                        <GroupChatroomActivities
                            groupId={groupId}
                        />
                    </>
                }
            </>
        )
    }
}

export default GroupChatroomView;