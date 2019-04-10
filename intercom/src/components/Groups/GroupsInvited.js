import React, { Component } from 'react';

import host from "../../host.js";
import axios from 'axios';


class GroupsInvited extends Component {
    state = {
        display: false,
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
        //delete the user from groupInvitees table
        axios
            .delete(`${host}/api/groups/${groupId}/groupInvitees/${userId.userId}`)
            .then(() => this.props.updateGroups() )
            .catch(err => {
                console.log(err);
            });
        //add the user to the groupMembers table
        axios
            .post(`${host}/api/groups/${groupId}/groupMembers`, userId)
            .then(() =>  this.props.updateGroups() )
            .catch(err => {
                console.log(err);
            });
        //add the activity to the group's log
        axios
            .post(`${host}/api/groups/${groupId}/activities`, activity)
            .then()
            .catch(err => {
                console.log(err);
            });
    }

    declineInvite = (event, groupId) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Declined to join to group.' }
        //delete the user from groupInvitees table due to decline
        axios
            .delete(`${host}/api/groups/${groupId}/groupInvitees/${userId.userId}`)
            .then(() => this.props.updateGroups() )
            .catch(err => {
                console.log(err);
            });
        //add the declining activity to the group's log
        axios
            .post(`${host}/api/groups/${groupId}/activities`, activity)
            .then()
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title">
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

                <div className="collapse" id="groups-invited">
                { this.props.groupsInvited.length === 0
                ? <p>You have no invites at this time.</p>
                : <>
                    {this.props.groupsInvited.map(group => (
                        <div key={group.groupId}>
                            <div className="row blogu">
                                <div className="col-sm-8 col-md-8">
                                    <h3 className="blog-title">
                                        {group.GroupName}
                                    </h3>
                                    <>
                                    <button className="btn btn-default" type="button" onClick={(e) => this.acceptInvite(e, group.groupId)}>
                                        Join
                                    </button>
                                    <span className="comments-padding"></span>
                                    <button className="btn btn-default" type="button" onClick={(e) => this.declineInvite(e, group.groupId)}>
                                        Decline
                                    </button>
                                    </>
                                </div>
                            </div>
                            <hr></hr>
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