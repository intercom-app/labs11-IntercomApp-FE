import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Table, Button } from 'reactstrap';
import host from "../../host.js";
import axios from 'axios';
import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';


class GroupsInvited extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: ''            
        }
    }

    acceptInvite = (event, groupId) => {
        event.preventDefault();
        // const groupId = this.props.
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Joined group.' }
        //delete the user from groupInvitees table
        axios
            .delete(`${host}/api/groups/${groupId}/groupInvitees/${userId.userId}`)
            .then(res => {
                this.props.updateGroups();                
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        //add the user to the groupMembers table
        axios
            .post(`${host}/api/groups/${groupId}/groupMembers`, userId)
            .then(groupMember => {
                this.props.updateGroups();
                console.log(groupMember)
            })
            .catch(err => {
                console.log(err);
            });
        //add the activity to the group's log
        axios
            .post(`${host}/api/groups/${groupId}/activities`, activity)
            .then(activity => {
                console.log(activity)
            })
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
            .then(res => {
                this.props.updateGroups(); 
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        //add the declining activity to the group's log
        axios
            .post(`${host}/api/groups/${groupId}/activities`, activity)
            .then(activity => {
                console.log(activity)
            })
            .catch(err => {
                console.log(err);
            });
    } 

    render() {
        return (<div>
            {/* {console.log(this.props.groupsInvited)} */}
            <h2>Groups Invited To</h2>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Group Name</th>
                        <th>Participants</th>  
                        <th>Call Status</th>                                                                                                                                        
                    </tr>
                </thead>
                {this.props.groupsInvited.map((group, key) => (
                    <tbody key={key}>
                        <tr>
                            <td><NavLink to={`/group/${group.groupId}`} >{group.groupId}</NavLink></td>                            
                            <td>
                                {group.GroupName}
                                <Button onClick={(e) => this.acceptInvite(e,group.groupId)} color='success'>Join</Button>
                                <Button onClick={(e) => this.declineInvite(e,group.groupId)} color='danger'>Decline</Button>
                            </td>
                            <CallParticipants groupId={group.groupId} />
                            <CallStatus groupId={group.groupId} />                            
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>);
    }
}

export default GroupsInvited;