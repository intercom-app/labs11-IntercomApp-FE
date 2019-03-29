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
        isOwner: false,
        error: null,
    }

    componentDidMount = async () => {
        const groupById = `${host}/api/groups/${this.state.groupId}`;
        try {
            const res = await axios.get(groupById)
            this.setState({ group: res.data })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }

        this.checkIfOwner();

    }

    checkIfOwner = async () => {
        const groupOwners = `${host}/api/groups/${this.state.groupId}/groupOwners`;
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

    render() {

        return (
            <>
                {this.state.error
                    ? <p>{this.state.error}</p>
                    : <>
                        <h3>{this.state.group.name}</h3>
                        <Link to={`/group/${this.state.groupId}/members`}>
                            {this.state.isOwner ? 'Manage Members' : 'View Members'}
                        </Link>

                        <GroupChatroomCall
                            groupId={this.state.groupId}
                        />
                        
                        <GroupChatroomActivities
                            groupId={this.state.groupId}
                        />
                    </>
                }
            </>
        )
    }
}

export default GroupChatroomView;