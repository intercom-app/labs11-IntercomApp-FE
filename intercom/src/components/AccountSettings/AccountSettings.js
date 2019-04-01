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
            groupsMember: [],
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

        this.getGroupsMemberOf(id);
    }

    getGroupsMemberOf = (id) => {
        axios
            .get(`${host}api/users/${id}/groupsBelongedTo`)
            .then(res => {
                this.setState({ groupsMember: res.data });
            })
            .catch(err => {
                console.error(err);
            });
    };

    handleDelete = () => {
        this.updateActivities();
    }

    updateActivities = () => {
        const activity = { userId: this.state.id, activity: 'Left Voice Chatroom' }
        const groups = this.state.groupsMember;
        const groupsIds = groups.map(group => group.groupId);
        groupsIds.forEach( id => {
            axios
            .post(`${host}/api/groups/${id}/activities`, activity)
            .then(res => {
                this.setState({ groupsMember: [] });
            })
            .catch(err => {
                console.log(err);
            });
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