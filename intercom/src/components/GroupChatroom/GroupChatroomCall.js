import React, { Component } from 'react';

class GroupChatroomCall extends Component {

    componentDidMount() {
        window.$('[data-toggle="tooltip"]').tooltip();
    }

    componentDidUpdate() {
        window.$('[data-toggle="tooltip"]').tooltip();
    }

    render() {

        // let { user, group, participants, handleCallButton } = this.props
        let { group, participants } = this.props

        return (
            <>
                <h1 className="page-header sidebar-title">
                    Call Status
                </h1>

                <div className="row blogu" >
                    <div className="col-sm-12 col-md-12">

                        <span className='pull-right info-link'>
                            <div
                                data-toggle="tooltip"
                                data-placement="left"
                                data-html="true"
                                title="Open the mobile application and select the group you wish to start or join a Voice Chat with. Within the group simply click <b>Start Call</b> or <b>Join Call</b> !"
                            >
                                <i className="fa fa-question-circle"></i>
                                {group.callStatus === true ? <>{' '}Join a Call</> : <>{' '}Start a Call</>}
                            </div>
                        </span>

                        <h3 className="blog-title color-elements">
                            {group.callStatus === true ? 'Active' : 'Inactive'}
                        </h3>

                    </div>

                    {group.callStatus === true
                        ?
                        <div className="col-sm-12 col-md-12">

                            <div style={{ marginTop: "8px" }}>
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

    // renderButton = (userCallStatus, groupCallStatus, handleCallButton) => {
    //     const userOnCall = (userCallStatus === true)
    //     const groupOnCall = (groupCallStatus === true)
    //     switch (true) {
    //         case (!userOnCall && !groupOnCall):
    //             return (
    //                 <button
    //                     className="btn btn-success"
    //                     type="button"
    //                     onClick={handleCallButton}>Start Call</button>
    //             )
    //         case (!userOnCall && groupOnCall):
    //             return (
    //                 <button
    //                     className="btn btn-success"
    //                     type="button"
    //                     onClick={handleCallButton}>Join Call</button>
    //             )
    //         case (userOnCall && groupOnCall):
    //             return (
    //                 <button
    //                     className="btn btn-danger"
    //                     type="button"
    //                     onClick={handleCallButton}>Leave Call</button>
    //             )
    //         default:
    //             return (
    //                 <button
    //                     className="btn btn-secondary"
    //                     type="button">In Call</button>
    //             )
    //     }

    // }

}


export default GroupChatroomCall;