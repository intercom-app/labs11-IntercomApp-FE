import React, { Component } from 'react';

import host from "../../host.js";
import axios from 'axios';


class GroupsInvited extends Component {
    state = {
        display: true,
    }

    toggleDisplay = () => {
        this.setState(prevState => ({
            display: !prevState.display
        }))
    }

    acceptInvite = (event, groupId) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Joined group.' }        
        
        // add the user to the groupMembers table first
        axios
        .post(`${host}/api/groups/${groupId}/groupMembers`, userId)
        .then(() => {
            // if user added, delete the user from groupInvitees table
            axios
            .delete(`${host}/api/groups/${groupId}/groupInvitees/${userId.userId}`)
            .then(() => {
            // add the activity to the group's log;
                axios
                .post(`${host}/api/groups/${groupId}/activities`, activity)
                .then(() => this.props.getUserDetailed())
                .catch(() => this.props.getUserDetailed());
            })
            .catch(() => this.props.getUserDetailed());
        })
        .catch(() => this.props.getUserDetailed());

        // Any error will prompt parent view to try to re-update user if error there it will throw error
    }

    declineInvite = (event, groupId) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Declined to join to group.' }

        // delete the user from groupInvitees first
        axios
        .delete(`${host}/api/groups/${groupId}/groupInvitees/${userId.userId}`)
        .then(() => {
             // if delete worked then post to group's activities and update groups even if error in posting
            axios
            .post(`${host}/api/groups/${groupId}/activities`, activity)                
            .then(() => this.props.getUserDetailed())
            .catch(() => this.props.getUserDetailed());
 
        })
        .catch(() => this.props.getUserDetailed());

        // Any error will prompt parent view to try to re-update user if error there it will throw error
    }

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title groups-title">
                    Groups Invited To
                    <span data-toggle="collapse" data-target="#groups-invited" >
                    { this.state.display 
                    ?   <i
                            className="fa fa-angle-up pull-right" 
                            style={{fontSize: "1.2em"}}
                            onClick={this.toggleDisplay}
                        >
                        </i>
                    :   <i 
                            className="fa fa-angle-down pull-right" 
                            style={{fontSize: "1.2em"}}
                            onClick={this.toggleDisplay}
                        >
                        </i>
                    }
                    </span>
                </h1>

                <div className="collapse in" id="groups-invited">
                { this.props.groupsInvited.length === 0
                ? <p className="no-groups">You have no invites at this time.</p>
                : <>
                    {this.props.groupsInvited.map(group => (
                        <div key={group.groupId} className="groups-row">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h3 className="blog-title" style={{marginBottom: "0px"}}>
                                        {group.groupName}
                                    </h3>
                                </div>

                                <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7" style={{padding: "8px 15px"}}>
                                    Invited by: {group.owners[0].displayName}
                                </div>
                                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                                    <button className="btn btn-join" type="button" onClick={(e) => this.acceptInvite(e, group.groupId)}>
                                        Join Group
                                    </button>
                                    <span className="comments-padding"></span>
                                    <button className="btn btn-decline" type="button" onClick={(e) => this.declineInvite(e, group.groupId)}>
                                        Decline
                                    </button>
                                </div>
                            </div>
                            <hr style={{marginBottom:"0px"}}></hr>
                        </div>
                    ))}
                </>
                }
                </div>

            </>
        );
    }
}

export default GroupsInvited;