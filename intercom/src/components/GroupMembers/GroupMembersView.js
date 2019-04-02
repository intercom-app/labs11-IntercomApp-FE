import React, { Component } from 'react';
import { Table, Container, Row, Button } from 'reactstrap';
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
            isOwner: false,
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

        this.checkIfOwner(this.state.id);
    }

    checkIfOwner = async (id) => {
        const groupOwners = `${host}/api/groups/${id}/groupOwners`;
        const userId = parseInt(localStorage.getItem('userId'));
        try {
            const res = await axios.get(groupOwners)
            res.data[0].userId === userId
                ? this.setState({ isOwner: true })
                : this.setState({ isOwner: false })
        } catch (err) {
            this.setState({ error: err.response.data.message })
        }

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
                this.state.members.forEach(member => {
                    if (member.userId === user.id) {
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
        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Removed ${userDisplayName} from the group` }
        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(() => {
                axios
                    .delete(`${host}/api/groups/${this.state.id}/groupMembers/${id}`)
                    .then(res => {
                        this.setState({ members: res.data });
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    removeInvitee = (e, id, userDisplayName) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Cancelled ${userDisplayName}'s invitation.` }
        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(() => {
                axios
                .delete(`${host}/api/groups/${this.state.id}/groupInvitees/${id}`)
                .then(res => {
                    this.setState({ invitees: res.data });
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    render() {

        let { search, users, members, invitees, isOwner } = this.state

        return (
            <Container>

                {isOwner
                    ? <>
                        <SearchBar
                            inputValue={search}
                            updateSearch={this.handleSearch}
                        />
                        {this.state.search.length >= 3
                            ? <SearchResults
                                users={users}
                                inviteUser={this.inviteUser}
                            />
                            : null
                        }
                    </>
                    : null
                }

                <Row>
                    <h3>Group Members</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Group Id</th>
                                <th>User Id</th>
                                <th>Member Name</th>
                                {isOwner ? <th>Manage Member</th> : null}
                            </tr>
                        </thead>
                        {members.map(member => (
                            <tbody key={member.userId}>
                                <tr>
                                    <td>{member.groupId}</td>
                                    <td>{member.userId}</td>
                                    <td>{member.displayName}</td>
                                    {isOwner
                                        ? <td>
                                            <Button
                                                color='danger'
                                                onClick={(e) => this.removeUser(e, member.userId, member.displayName)}
                                            >
                                                Remove Member
                                            </Button>
                                        </td>
                                        : null
                                    }
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
                                <th>User Id</th>
                                <th>Invitee Name</th>
                                {isOwner ? <th>Manage Invitee</th> : null}
                            </tr>
                        </thead>
                        {invitees.map(invitee => (
                            <tbody key={invitee.userId}>
                                <tr>
                                    <td>{invitee.groupId}</td>
                                    <td>{invitee.userId}</td>
                                    <td>{invitee.displayName}</td>
                                    {isOwner
                                        ? <td>
                                            <Button
                                                color='danger'
                                                onClick={(e) => this.removeInvitee(e, invitee.userId, invitee.displayName)}
                                            >
                                                Remove Invitee
                                            </Button>
                                        </td>
                                        : null
                                    }
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