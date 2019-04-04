import React, { Component } from 'react';

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
                        className="btn btn-secondary"
                        type="button">In Call</button>
                )
        }

    }

    render() {

        let { user, group, participants, handleCallButton } = this.props

        return (
            <>
                <aside className="col-md-8 sidebar-padding">
                    <div className="">
                        {this.renderButton(user.callStatus, group.callStatus, handleCallButton)}
                        <hr></hr>
                        <h4 className="sidebar-title">Phone Number</h4>
                        <p>
                            {group.phoneNumber
                                ? group.phoneNumber
                                : 'No Active Phone Number'
                            }
                        </p>

                        <h4 className="sidebar-title">Call Participants</h4>
                        
                        <p>
                            {participants.map(user =>
                                <span key={user.userId}>
                                    {user.displayName}{' '}
                                </span>
                            )}
                        </p>
                    </div>
                </aside>
            </>

        )
    }

}


export default GroupChatroomCall;