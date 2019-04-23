import React, { Component } from "react";
import Fuse from 'fuse.js';
import host from "../../host.js";
import axios from 'axios';

import Error from '../Error/Error';
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
            error: false,
        };

    }

    handleGroupInput = e => {
        this.setState({
            group: { [e.target.name]: e.target.value}
        })
    }

    handleSearch = async (e) => {
        this.setState({ search: e.target.value });

        let users;
        await axios
            .get(`${host}/api/users`)
            .then(res => users = res.data)
            .catch(() => this.setState({ users: [] }));

        if (users.length > 0) {
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

            this.setState({ users: usersUpdated });
        } else {
            this.setState({ users: [] });           
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
        // Add user - If error in posting, don't want to post to activities and want to throw error
        axios
        .post(`${host}/api/groups/${this.state.group.id}/groupInvitees`, { userId: id })
        .then(res => {
            // Update state with updated group invitees 
            this.setState({
                users: users,
                invitees: res.data
            })
            // Add to group activities - whether or not posted still want to update groups with activities
            axios
                .post(`${host}/api/groups/${this.state.group.id}/activities`, activity)
                .then(() => this.props.updateGroups())
                .catch(() => this.props.updateGroups())
        })
        .catch(err => {
            this.clearSearch()
            this.setState({ error: {code: err.response.status, message: err.response.statusText} }); 
        });
    }

    clearSearch = () => {
        this.setState({ 
            invite: false,
            search: '',
            members: [],
            users: [],
            invitees: [],
            group: { name: '' },
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
        const groupData = { name: this.state.group.name}

        try {
            // First Creat New Group
            const res = await axios.post(`${host}/api/groups`, groupData)
            if (res) {
                this.setState({ group: res.data })
                // Then add user as group owner
                axios
                .post(`${host}/api/groups/${res.data.id}/groupOwners`, userId)
                .then(() => {
                    // Then add user as group member
                    axios
                    .post(`${host}/api/groups/${res.data.id}/groupMembers`, userId)
                    .then(() => {   
                        // Then add to group activities and update groups
                        axios
                        .post(`${host}/api/groups/${res.data.id}/activities`, activity)
                        .then(() => this.props.updateGroups())
                    })
                })
            }
        } catch (err) { 
            this.clearSearch();
            this.setState({ error: {code: err.response.status, message: err.response.statusText} }); 
        };

        this.toggleInvite()

    };

    render() {

        let { error, group, invite, search, users } = this.state

        return (
            <> { error ? <Error error={error}/> : 

            <div className="blog-sidebar">
                <h3 className="sidebar-title">Create New Group</h3>
                <hr></hr>
                <h4 className="sidebar-title">New Group Name: </h4>

                <div className="input-group">
                    <input
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="name"
                        id="groupNameInput"
                        placeholder="Group Name..."
                        maxLength="20"
                        value={group.name}
                        onChange={this.handleGroupInput}
                        disabled={invite} // If group created and invite toggle open, disable group input field
                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-default"
                            type="button"
                            onClick={this.createGroup}
                            disabled={group.name === "" || invite} // If no group name or invite open, button disabled
                        >
                            {/* Create if not yet done, if created and invite toggle open then displays Created */}
                            {!invite ? `Create` : `Created`} 
                        </button>
                    </span>
                </div>

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

            }</>
        );
    }
}

export default GroupForm;