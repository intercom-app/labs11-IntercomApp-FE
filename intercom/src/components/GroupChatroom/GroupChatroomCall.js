import React, { Component } from 'react';
import GroupChatroomCallModel from './GroupChatroomCallModel';

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
                    <div className="col-sm-12 col-md-12">

                        <span className='pull-right info-link'>
                            <a  href="#" 
                                data-toggle="tooltip" 
                                data-placement="left"
                                title="Open the mobile application and select the group you wish to start or join a Voice Chat with. Within the group simply click 'Start Call' or 'Join Call' !"
                            >
                                <i className="fa fa-question-circle"></i>
                                {group.callStatus === true ? <>{' '}Join a Call</> : <>{' '}Start a Call</>}
                            </a>
                        </span>

                        <h3 className="blog-title color-elements">
                            {group.callStatus === true ? 'Active' : 'Inactive'}
                        </h3>

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

                        <p className="p-list">
                            {participants.map(user =>
                                <span key={user.userId}>
                                    {user.displayName}{' | '}
                                </span>
                            )}
                        </p>
                    </div >
                    : null
                    }

                </div>
                <hr></hr>

                {/* <aside className="col-md-8 sidebar-padding">
                    <div className="">
                        {this.renderButton(user.callStatus, group.callStatus, handleCallButton)}
                        <hr></hr>
                    </div>
                </aside> */}
            </>

        )
    }

}


export default GroupChatroomCall;