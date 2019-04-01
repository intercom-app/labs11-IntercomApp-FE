import React, { Component } from 'react';
import { Card } from 'reactstrap';

class GroupChatroomCall extends Component {

    renderButton = (userCallStatus, groupCallStatus) => {
        const userOnCall = (userCallStatus === 1)
        const groupOnCall = (groupCallStatus === 1)
        let text = ''
        switch(true) {
            case (!userOnCall && !groupOnCall):
                text = 'Start Call'
                break;
            case (!userOnCall && groupOnCall):
                text = 'Join Call'
                break;
            case (userOnCall && groupOnCall):
                text = 'Leave Call'
                break;
            default:
                break;
        }
        return text;

    }

    render() {

        let { user, group, participants, handleCallButton } = this.props

        return (
            <>

                <button onClick={handleCallButton} className='mt-sm-4'>
                    {this.renderButton(user.callStatus, group.callStatus)}
                </button>
                <Card className='mt-sm-4 mb-sm-4'>
                    <h5>Phone Number</h5>
                    {group.phoneNumber
                        ? group.phoneNumber
                        : 'No Active Phone Number'
                    }
                </Card>

                <h5>Call Participants</h5>
                <ul>
                    {participants.map(user =>
                        <li key={user.userId}>
                            {user.displayName}
                        </li>
                    )}
                </ul>
            </>

        )
    }

}


export default GroupChatroomCall;