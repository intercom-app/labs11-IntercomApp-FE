import React, { Component } from "react";
import Fuse from 'fuse.js';
import host from "../../host.js";
import axios from 'axios';
import SearchBar from '../Search/SearchBar';
import SearchResults from '../Search/SearchResults';


class GroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invite: false,
            search: '',
            members: [],
            invitees: [],
            users: [],
            group: {
                name: ''
            },
            error: null,
        };

    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups/${this.state.group.id}/groupMembers`)
            .then(res => {
                this.setState({
                    members: res.data,
                    search: '',
                });
            })
            .catch(err => this.setState({ error: err }));

        axios
            .get(`${host}/api/groups/${this.state.group.id}/groupInvitees`)
            .then(res => {
                this.setState({ invitees: res.data });
            })
            .catch(err => this.setState({ error: err }));
    }

    handleGroupInput = e => {
        this.setState({
            group: {
                ...this.state.group,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSearch = async (e) => {
        this.setState({
            search: e.target.value
        });

        let users;
        await axios
            .get(`${host}/api/users`)
            .then(res => users = res.data)
            .catch(err => this.setState({ error: err }));

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
                if ( parseInt(localStorage.getItem('userId')) === user.id) {
                    buttonInvite = false
                }
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

        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Invited ${user.displayName} to the group` }
        axios
            .post(`${host}/api/groups/${this.state.group.id}/activities`, activity)
            .then(() => {
                axios
                    .post(`${host}/api/groups/${this.state.group.id}/groupInvitees`, { userId: id })
                    .then(res => {
                        this.setState({
                            users: users,
                            invitees: res.data
                        })
                    })
                    .catch(err => this.setState({ error: err }));
            })
            .catch(err => this.setState({ error: err }));
    }

    toggleInvite = () => {
        this.setState(prevState => ({
            invite: !prevState.invite
        }));
    }

    createGroup = async (event) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Created group.' }
        const groupData = {
            name: this.state.group.name
        }

        try {
            const group = await axios.post(`${host}/api/groups`, groupData)
            if (group) {
                await this.setState({ group: group.data })
                axios
                    .post(`${host}/api/groups/${this.state.group.id}/groupOwners`, userId)
                    .then(() => { this.props.updateGroups() })
                    .catch(err => this.setState({ error: err }));

                axios
                    .post(`${host}/api/groups/${this.state.group.id}/groupMembers`, userId)
                    .then(() => { this.props.updateGroups() })
                    .catch(err => this.setState({ error: err }));

                axios
                    .post(`${host}/api/groups/${this.state.group.id}/activities`, activity)
                    .then()
                    .catch(err => this.setState({ error: err }));


            }
        } catch (err) { this.setState({ error: err }) };

        this.toggleInvite()

    };

    render() {

        let { group, invite, search, users } = this.state

        return (
            <>
                <aside className="col-md-4 sidebar-padding">
                    <div className="blog-sidebar">
                        <h3 className="sidebar-title">Create New Group</h3>
                        <hr></hr>
                        <h4 className="sidebar-title">New Group Name: </h4>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Group Name..."
                                onChange={this.handleGroupInput}
                                value={group.name}
                            />
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-default"
                                    type="button"
                                    onClick={this.createGroup}
                                >
                                    Create
                                </button>
                            </span>
                        </div>

                        {invite
                            ? <>
                                <h4 className="sidebar-title">Invite Users to {group.name}:</h4>
                                <SearchBar
                                    inputValue={search}
                                    updateSearch={this.handleSearch}
                                />
                                {search.length >= 3
                                    ? <SearchResults
                                        users={users}
                                        inviteUser={this.inviteUser}
                                    />
                                    : null
                                }
                            </>
                            : null
                        }
                    </div>
                </aside>
            </>
        );
    }
}

export default GroupForm;