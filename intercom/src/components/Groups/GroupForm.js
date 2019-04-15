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

    handleGroupInput = e => {
        this.setState({
            group: { [e.target.name]: e.target.value}
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

    clearSearch = () => {
        this.setState({ 
            search: '',
            users: [],
            invitees: [],
            group: { name: '' },
            invite: false
        })
        document.getElementById("groupNameInput").value = '';
    }

    toggleInvite = () => {
        this.setState({
            search: '',
            users: [],
            invitees: [],
            invite: true
        });
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
            <div className="blog-sidebar">
                <h3 className="sidebar-title">Create New Group</h3>
                <hr></hr>
                <h4 className="sidebar-title">New Group Name: </h4>
                {!invite
                ? 
                <div className="input-group">
                    <input
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="name"
                        id="groupNameInput"
                        placeholder="Group Name..."
                        onChange={this.handleGroupInput}
                        value={group.name}
                    />
                    <span className="input-group-btn">
                        {group.name === ""
                        ?
                        <button
                            className="btn btn-default"
                            type="button"
                            disabled
                        >
                            Create
                        </button>
                        :
                        <button
                            className="btn btn-default"
                            type="button"
                            onClick={this.createGroup}
                        >
                            Create
                        </button>
                        }
                    </span>
                </div>
                :
                <div className="input-group">
                    <input
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="name"
                        id="groupNameInput"
                        value={group.name}
                        disabled
                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-default"
                            type="button"
                            disabled
                        >
                            Created
                        </button>
                    </span>
                </div>
                }

                {invite && group.name
                    ? <>
                        <h4 className="sidebar-title" style={{marginTop: "20px"}}>
                            Invite Users to {group.name}:
                        </h4>
                        <SearchBar
                            inputValue={search}
                            updateSearch={this.handleSearch}
                            clearSearch={this.clearSearch}
                        />
                        {search.length >= 3
                            ? <SearchResults
                                users={users}
                                inviteUser={this.inviteUser}
                            />
                            : null
                        }
                        <p>Search for users by name or email to invite. Once complete, or if you do not wish to invite a user at this time, click done.</p>

                    </>
                    : null
                }
            </div>
        );
    }
}

export default GroupForm;