import React, { Component } from 'react';

class GroupChatroomCall extends Component {

    renderButton = (userCallStatus, groupCallStatus, handleCallButton) => {
        const userOnCall = (userCallStatus === true)
        const groupOnCall = (groupCallStatus === true)
        switch (true) {
            case (!userOnCall && !groupOnCall):
                return (
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={handleCallButton}>Start Call</button>
                )
            case (!userOnCall && groupOnCall):
                return (
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={handleCallButton}>Join Call</button>
                )
            case (userOnCall && groupOnCall):
                return (
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={handleCallButton}>Leave Call</button>
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
                <h1 className="page-header sidebar-title">
                    Call Status
                </h1>

                <div className="row blogu" >
                    <div className="col-sm-8 col-md-8">
                        {group.callStatus === true 
                            ? <h3 className="blog-title color-elements">Active</h3>
                            : <h3 className="blog-title">Inactive</h3>
                        }
                    </div>

                    {group.callStatus === true 
                    ? 
                    <div className="col-sm-12 col-md-12">
                        <div>
                            <strong>Phone Number: </strong>
                            <span className="comments-padding"></span>
                            {group.phoneNumber}
                        </div>

                        <div style={{marginTop: "8px"}}>
                            <strong>Call Participants:</strong>
                            <span className="comments-padding"></span>
                            {participants.length}
                        </div>

                        <p style={{marginTop: "0px", paddingTop: "4px"}}>
                            {participants.map(user =>
                                <span key={user.userId}>
                                    {user.displayName}{' | '}
                                </span>
                            )}
                        </p>
                    </div >
                    : null
                    }

                    {/* <div className="col-sm-12 col-md-12">
                        <CallStatus groupId={group.groupId} />
                        <span className="comments-padding"></span>
                        <CallParticipants groupId={group.groupId} />
                        <Link to={`/group/${group.groupId}/members`} className='pull-right'>
                            Manage Members
                        </Link>
                    </div > */}

                </div>
                <hr></hr>

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