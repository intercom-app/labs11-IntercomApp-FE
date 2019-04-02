import React, { Component } from 'react';
import { Table, Container, Row } from 'reactstrap';
import axios from "axios";
import Fuse from 'fuse.js';

import host from "../../host.js";
import SearchBar from '../Search/SearchBar';
import SearchResults from '../Search/SearchResults';

class GroupMembersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            members: [],
            invitees: [],
            users: [],
            search: '',
            error: null
        };
    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups/${this.state.id}/groupMembers`)
            .then(res => {
                this.setState({
                    members: res.data,
                    search: '',
                });
            })
            .catch(err => console.error(err));

        axios
            .get(`${host}/api/groups/${this.state.id}/groupInvitees`)
            .then(res => {
                this.setState({ invitees: res.data });
            })
            .catch(err => console.error(err));
    }

    isOwner = (id) => {
        return parseInt(localStorage.getItem('userId')) === id
    }

    handleSearch = async (e) => {
        this.setState({
            search: e.target.value
        });

        let users;
        await axios
            .get(`${host}/api/users`)
            .then(res => users = res.data)
            .catch(err => console.error(err));

        if (users) {
            const options = {
                shouldSort: true,
                findAllMatches: true,
                threshold: 0.2,
                location: 0,
                distance: 128,
                maxPatternLength: 128,
                minMatchCharLength: 3,
                keys: [
                    "displayName",
                    "email"
                ]
            };
            const fuse = new Fuse(users, options);
            const results = fuse.search(this.state.search);

            const usersUpdated = results.map(user => {
                let buttonInvite = true
                this.state.invitees.forEach(invitee => {
                    if (invitee.userId === user.id) {
                        buttonInvite = false
                    }
                })
                return { ...user, buttonInvite }
            })

            this.setState({
                users: usersUpdated,
            });
        }
    }

    inviteUser = (e, id) => {
        e.preventDefault();
        const users = this.state.users
        const index = users.findIndex(user => user.id === id)

        const user = this.state.users[index]
        const userUpdated = { ...user, buttonInvite: false }
        users.splice(index, 1, userUpdated)

        axios.post(`${host}/api/groups/${this.state.id}/groupInvitees`, { userId: id })
            .then(res => {
                this.setState({
                    users: users,
                    invitees: res.data
                })
            })
            .catch(err => console.error(err));
    }


    removeUser = (e, id, userDisplayName) => {
        e.preventDefault();
        const ownerId = localStorage.getItem('userId')
        const activity = { userId: ownerId, activity: `Removed ${userDisplayName} from the group` }
        axios
            .delete(`${host}/api/groups/${this.state.id}/groupMembers/${id}`)
            .then(res => {
                this.setState({ members: res.data});
                // console.log(res)
            })
            .catch(err => console.error(err));

        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(activity => {
                // console.log(activity)
            })
            .catch(err => console.error(err));

    }

    removeInvitee = (e, id, userDisplayName) => {
        e.preventDefault();
        const ownerId = localStorage.getItem('userId')
        const activity = { userId: ownerId, activity: `Cancelled ${userDisplayName}'s invitation.` }
        axios
            .delete(`${host}/api/groups/${this.state.id}/groupInvitees/${id}`)
            .then(res => {
                this.setState({ invitees: res.data });
                // console.log(res)
            })
            .catch(err => console.error(err));

        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(activity => {
                // console.log(activity)
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <Container>
                <SearchBar
                    inputValue={this.state.search}
                    updateSearch={this.handleSearch}
                />
                {this.state.search.length >= 3
                    ? <SearchResults
                        users={this.state.users}
                        inviteUser={this.inviteUser}
                    />
                    : <></>
                }

                <Row>
                    <h3>Group Members</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Group Id</th>
                                <th>Member Name</th>
                            </tr>
                        </thead>
                        {this.state.members.map((member, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{member.groupId}</td>
                                    <td>{member.displayName} {!this.isOwner(member.userId) ? 
                                        <Button color='danger' onClick={(e) => this.removeUser(e, member.userId, member.displayName)}>Remove user</Button> 
                                        : null}
                                    </td>
                                </tr>
                            </tbody>

                        ))}
                    </Table>
                </Row>
                <Row>
                    <h3>Group Invitees</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Group Id</th>
                                <th>Invitee Name</th>
                            </tr>
                        </thead>
                        {this.state.invitees.map((invitee, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{invitee.groupId}</td>
                                    <td>{invitee.displayName}
                                        <Button color='danger' onClick={(e) => this.removeInvitee(e, invitee.userId, invitee.displayName)}>Remove user</Button>

                                    </td>
                                </tr>
                            </tbody>

                        ))}
                    </Table>
                </Row>
            </Container>
        )
    }
}

export default GroupMembersView;