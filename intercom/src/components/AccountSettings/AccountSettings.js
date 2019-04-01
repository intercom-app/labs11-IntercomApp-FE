import React, { Component } from 'react';
import { Button, Container, CardBody, CardTitle } from 'reactstrap'
import host from "../../host.js";
import axios from 'axios';
import AccountUpdateForm from './AccountUpdateForm';




class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            id: this.props.id,
        }
    }

    componentWillMount() {
        const id = localStorage.getItem('userId')
        const userEndpoint = `${host}/api/users/${id}`;

        axios.get(userEndpoint)
            .then(res => {
                this.setState({ user: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    user: {},
                });
            });

    }

    handleDelete = (id) => {
        this.addGroupsMemberActivities(id); // First updates activities for all groups user belonged to
        // Second updates activities for all groups user was invited to
        // Third deletes all groups user was owner of
        // Last deletes user and logs out
    }

    addGroupsMemberActivities = (id) => {
        const activity = { userId: id, activity: 'Left group. User left Voice Chatroom.' }
        axios
            .get(`${host}/api/users/${id}/groupsBelongedTo`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                groupsIds.forEach(groupId => {
                    axios
                        .post(`${host}/api/groups/${groupId}/activities`, activity)
                        .then(() => this.addGroupsInviteeActivities(id))
                        .catch(err => console.log(err));
                })
            })
            .catch(err => console.error(err));
    }

    addGroupsInviteeActivities = (id) => {
        const activity = { userId: id, activity: 'Declined invite. User left Voice Chatroom.' }
        axios
            .get(`${host}/api/users/${id}/groupsInvitedTo`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                groupsIds.forEach(groupId => {
                    axios
                        .post(`${host}/api/groups/${groupId}/activities`, activity)
                        .then(() => this.deleteGroupsOwnerOf(id))
                        .catch(err => console.log(err));
                })
            })
            .catch(err => console.error(err));
    }

    deleteGroupsOwnerOf = (id) => {
        axios
            .get(`${host}/api/users/${id}/groupsOwned`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                groupsIds.forEach(groupId => {
                    axios
                        .delete(`${host}/api/groups/${groupId}`)
                        .then(() => this.deleteAccount(id))
                        .catch(err => console.log(err));
                })
            })
            .catch(err => console.error(err));
    }

    deleteAccount = (id) => {
        axios
            .delete(`${host}/api/users/${id}`)
            .then(() => this.props.auth.logout())
            .catch(err => console.log(err));
    }

    render() {

        return (
            <Container>
                <>
                    <h2>Account Settings</h2>
                    <Button className='float-sm-right' color="danger" onClick={() => this.handleDelete(this.state.user.id)}>Delete Account</Button>
                    <AccountUpdateForm user={this.state.user} />
                    <CardBody>
                        <CardTitle><strong>Id: </strong>{this.state.user.id}</CardTitle>
                        <CardTitle><strong>Nickname: </strong>{this.state.user.displayName}</CardTitle>
                        <CardTitle><strong>Email: </strong>{this.state.user.email}</CardTitle>
                        <CardTitle><strong>Billing Type: </strong>{this.state.user.billingSubcription}</CardTitle>
                    </CardBody>
                </>
            </Container>);
    }
}

export default AccountSettings;