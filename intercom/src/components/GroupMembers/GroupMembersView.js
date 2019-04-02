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
            search: ''
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
            .catch(err => {
                console.error(err);
            });

        axios
            .get(`${host}/api/groups/${this.state.id}/groupInvitees`)
            .then(res => {
                this.setState({ invitees: res.data });

            })
            .catch(err => {
                console.error(err);
            });
    }

    handleSearch = async (e) => {
        console.log("SEARCH", e.target.value)
        this.setState({
            search: e.target.value
        });

        let users;
        await axios
            .get(`${host}/api/users`)
            .then(res => users = res.data)
            .catch(err => console.log(err));

        if (users) {
            const options = {
                shouldSort: true,
                findAllMatches: true,
                threshold: 0.3,
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
                return { ...user, buttonInvite: true }
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
                console.log("INVITE", users)
                console.log("INVITE", res.data)
                this.setState({
                    users: users,
                    invitees: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log('USERS:', this.state.users)
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
                                <th>id</th>
                                <th>Member Name</th>
                            </tr>
                        </thead>
                        {this.state.members.map((member, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{member.groupId}</td>
                                    <td>{member.displayName}</td>
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
                                <th>id</th>
                                <th>Invitee Name</th>
                            </tr>
                        </thead>
                        {this.state.invitees.map((invitee, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{invitee.groupId}</td>
                                    <td>{invitee.displayName}</td>
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