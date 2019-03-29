import React, { Component } from 'react';
import axios from 'axios';

import host from '../../host';

class GroupChatroomCall extends Component {
    state = {
        group: {},
        participants: [],
        phoneNumber: '',
        error: null,
    }

    componentDidMount = async () => {
        const groupById = `${host}/api/groups/${this.props.groupId}`;
        try {
            const res = await axios.get(groupById)
            this.setState({ group: res.data })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }

        this.getParticipants()
        console.log(this.state.group)

    }

    getParticipants = async () => {
        const participants = `${host}/api/groups/${this.props.groupId}/callParticipants`;
        try {
            const res = await axios.get(participants)
            this.setState({ participants: res.data })
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
                        <button>
                            {this.state.group.callStatus === 0 ? 'Start Chat' : 'Join Chat'}
                        </button>

                        <h5>Phone Number</h5>
                        {this.state.group.phoneNumber
                            ? this.state.group.phoneNumber
                            : 'No Active Phone Number'
                        }

                        <h5>Call Participants</h5>
                        <ul>
                            {this.state.participants.map(user =>
                                <li key={user.userId}>
                                    {user.displayName}
                                </li>
                            )}
                        </ul>
                    </>
                }
            </>
        )
    }

}


export default GroupChatroomCall;