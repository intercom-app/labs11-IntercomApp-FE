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
        }
    }

    componentDidMount() {
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

    handleUpdate = () => {
        const id = this.state.user.id
        axios
            .get(`${host}/api/users/${id}`)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err));
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
                if (groupsIds.length === 0) { this.addGroupsInviteeActivities(id) }
                else {
                    groupsIds.forEach(groupId => {
                        axios
                            .post(`${host}/api/groups/${groupId}/activities`, activity)
                            .then(() => this.addGroupsInviteeActivities(id))
                            .catch(err => console.log(err));
                    })
                }
            })
            .catch(err => console.error(err));
    }

    addGroupsInviteeActivities = (id) => {
        const activity = { userId: id, activity: 'Declined invite. User left Voice Chatroom.' }
        axios
            .get(`${host}/api/users/${id}/groupsInvitedTo`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                if (groupsIds.length === 0) { this.deleteGroupsOwnerOf(id) }
                else {
                    groupsIds.forEach(groupId => {
                        axios
                            .post(`${host}/api/groups/${groupId}/activities`, activity)
                            .then(() => this.deleteGroupsOwnerOf(id))
                            .catch(err => console.log(err));
                    })
                }
            })
            .catch(err => console.error(err));
    }

    deleteGroupsOwnerOf = (id) => {
        axios
            .get(`${host}/api/users/${id}/groupsOwned`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                if (groupsIds.length === 0) { this.deleteAccount(id) }
                else {
                    groupsIds.forEach(groupId => {
                        axios
                            .delete(`${host}/api/groups/${groupId}`)
                            .then(() => this.deleteAccount(id))
                            .catch(err => console.log(err));
                    })
                }
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

        const { user } = this.state

        return (
            <>
                <div className="container blog">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10">
                            <h2>Account</h2>
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px" }}>Profile</h3>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left"><strong>{user.displayName}</strong></div>
                                            <div className="pull-right">Change Name</div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px" }}>Plan Details</h3>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">{`${user.billingSubcription}`.toUpperCase()} Membership</div>
                                            <div className="pull-right">Upgrade</div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">Pay as you chat</div>
                                            <div className="pull-right">Details</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px" }}>Billing</h3>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">•••• •••• •••• 4242</div>
                                            <div className="pull-right">Update</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>

                        </div>
                    </div>
                </div>
                {/* <Container>
                <>
                    <h2>Account Settings</h2>
                    <Button className='float-sm-right' color="danger" onClick={() => this.handleDelete(user.id)}>Delete Account</Button>
                    <AccountUpdateForm updateUser={this.handleUpdate}/>
                    <CardBody>
                        <CardTitle><strong>Id: </strong>{user.id}</CardTitle>
                        <CardTitle><strong>Nickname: </strong>{user.displayName}</CardTitle>
                        <CardTitle><strong>Email: </strong>{user.email}</CardTitle>
                        <CardTitle><strong>Billing Type: </strong>{user.billingSubcription}</CardTitle>
                    </CardBody>
                </>
            </Container> */}
            </>
        );
    }
}

export default AccountSettings;