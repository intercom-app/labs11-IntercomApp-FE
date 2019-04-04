import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';

class GroupChatroomCall extends Component {

    renderButton = (userCallStatus, groupCallStatus, handleCallButton) => {
        const userOnCall = (userCallStatus === 1)
        const groupOnCall = (groupCallStatus === 1)
        switch (true) {
            case (!userOnCall && !groupOnCall):
                return (
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={this.handleCallButton}>Start Call</button>
                )
            case (!userOnCall && groupOnCall):
                return (
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={this.handleCallButton}>Join Call</button>
                )
            case (userOnCall && groupOnCall):
                return (
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={this.handleCallButton}>Leave Call</button>
                )
            default:
                return (
                    <button
                        className="btn btn-seconday"
                        type="button">Start Call</button>
                )
        }

    }

    render() {

        let { user, group, participants, handleCallButton } = this.props

        return (
            <>
                <aside className="col-md-4 sidebar-padding">
                    <div className="blog-sidebar">
                {this.renderButton(user.callStatus, group.callStatus, handleCallButton)}
                        <hr></hr>
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
                    </div>
                </aside>
            </>

        )
    }

}


export default GroupChatroomCall;