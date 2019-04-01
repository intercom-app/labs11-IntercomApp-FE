import React, { Component } from 'react';
import { Button, Row, Container, CardBody, CardTitle } from 'reactstrap'
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
        this.updateActivities(id);
        this.deleteGroupsOwnerOf(id);
    }

    updateActivities = (id) => {
        const activity = { userId: id, activity: 'Left Voice Chatroom' }

        let groupsMemberOf;
        axios
        .get(`${host}api/users/${id}/groupsBelongedTo`)
        .then(res => groupsMemberOf = res.data)
        .catch(err => console.error(err));

        const groupsIds = groupsMemberOf.map(group => group.groupId);
        groupsIds.forEach( id => {
            axios
            .post(`${host}/api/groups/${id}/activities`, activity)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        })
    }

    deleteGroupsOwnerOf = (id) => {
        let groupsOwnerOf;
        axios
        .get(`${host}api/users/${id}/groupsOwned`)
        .then(res => groupsOwnerOf = res.data)
        .catch(err => console.error(err));

        const groupsIds = groupsOwnerOf.map(group => group.groupId);
        groupsIds.forEach( id => {
            axios
            .delete(`${host}/api/groups/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        })
    }

    deleteAccount = (id) => {
        axios
            .delete(`${host}/api/users/${id}`)
            .then(deletedUser => {
            })
            .catch(err => {
                console.log(err);
            });
        this.props.auth.logout()
    }

    render() {

        return (<Container>
            <>
                <h2>Account Settings</h2>
                <Button className='float-sm-right' color="danger" onClick={() => this.handleDelete(this.state.id)}>Delete Account</Button>
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