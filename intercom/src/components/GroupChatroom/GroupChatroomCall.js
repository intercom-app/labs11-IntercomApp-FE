import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';

class GroupChatroomCall extends Component {

    renderButton = (userCallStatus, groupCallStatus, handleCallButton) => {
        const userOnCall = (userCallStatus === 1)
        const groupOnCall = (groupCallStatus === 1)
        switch (true) {
            case (!userOnCall && !groupOnCall):
                return (
                    <Button onClick={handleCallButton} color='success' >
                        Start Call
                    </Button>
                )
            case (!userOnCall && groupOnCall):
                return (
                    <Button onClick={handleCallButton} outline color='success' >
                        Join Call
                    </Button>
                )
            case (userOnCall && groupOnCall):
                return (
                    <Button onClick={handleCallButton} outline color='danger' >
                        Leave Call
                    </Button>
                )
            default:
                return (
                    <Button disabled color='secondary' >
                        On another group call
                    </Button>
                )
        }

    }

    render() {

        let { user, group, participants, handleCallButton } = this.props

        return (
            <>

                {this.renderButton(user.callStatus, group.callStatus, handleCallButton)}

                <Card className='mt-sm-4 mb-sm-4'>
                    <CardBody>
                        <CardTitle><strong>Phone Number</strong></CardTitle>
                        <CardText>
                            {group.phoneNumber
                                ? group.phoneNumber
                                : 'No Active Phone Number'
                            }
                        </CardText>

                        <CardTitle><strong>Call Participants</strong></CardTitle>
                        <CardText>
                            {participants.map(user =>
                                <span key={user.userId}>
                                    {user.displayName}{' '}
                                </span>
                            )}
                        </CardText>
                    </CardBody>
                </Card>
            </>

        )
    }

}


export default GroupChatroomCall;