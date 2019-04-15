import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Fuse from 'fuse.js';
import host from "../../host.js";
import SearchBar from '../Search/SearchBar';
import RecentActivity from '../RecentActivity/RecentActivity';
import SearchResults from '../Search/SearchResults';
import GroupMembersList from './GroupMembersList.js';
import GroupInviteesList from './GroupInviteesList.js';
import Footer from '../LandingPage/Footer';

class GroupMembersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            group: '',
            members: [],
            membersDetails: [],
            activities: [],
            invitees: [],
            users: [],
            search: '',
            isOwner: false,
            error: null
        };
    }

    componentDidMount() {
        // Get Group
        axios
            .get(`${host}/api/groups/${this.state.id}`)
            .then(res => this.setState({ group: res.data }) )
            .catch(err => this.setState({ error: err }));
        
        this.getGroupMembers()
        this.getGroupInvitees()
        this.getGroupActivities()
        this.checkIfOwner(this.state.id);
    }

    getGroupMembers = () => {
        axios
            .get(`${host}/api/groups/${this.state.id}/groupMembers/detailed`)
            .then(res => this.setState({ members: res.data }) )
            .catch(err => this.setState({ error: err }));
    }

    getGroupInvitees = () => {
        axios
            .get(`${host}/api/groups/${this.state.id}/groupInvitees/detailed`)
            .then(res => this.setState({ invitees: res.data }) )
            .catch(err => this.setState({ error: err }));
    }

    getGroupActivities = () => {
        axios
            .get(`${host}/api/groups/${this.state.id}/activities`)
            .then(res => {
                const activities = res.data.map(activity => {
                    return { ...activity, groupId: activity.groupId, groupName: activity.GroupName}
                })
                const updatedActivities = this.state.activities.concat(activities)

                const filteredActivities = updatedActivities.filter((activity, index, self) =>
                    index === self.findIndex((i) => (i.id === activity.id))
                )

                filteredActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                this.setState({
                    activities: filteredActivities
                });
            })
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
            this.setState({ error: err })
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
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(() => {
                axios
                    .post(`${host}/api/groups/${this.state.id}/groupInvitees`, { userId: id })
                    .then(() => {
                        this.setState({ users })
                        this.getGroupInvitees()
                    })
                    .catch(err => this.setState({ error: err }));
            })
            .catch(err => this.setState({ error: err }));
    }

    clearSearch = () => {
        this.setState({ search: '', users: []})
    }

    removeUser = (e, id, userDisplayName) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Removed ${userDisplayName} from the group` }
        // Add to group activities
        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(() => {
                // Delete member
                axios
                    .delete(`${host}/api/groups/${this.state.id}/groupMembers/${id}`)
                    .then(() => {
                        // Update state with updated group members
                        this.getGroupMembers()
                    })
                    .catch(err => this.setState({ error: err }));
            })
            .catch(err => this.setState({ error: err }));
    }

    removeInvitee = (e, id, userDisplayName) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Cancelled ${userDisplayName}'s invitation.` }
        // Add to group activities
        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(() => {
                // Delete Invitee
                axios
                    .delete(`${host}/api/groups/${this.state.id}/groupInvitees/${id}`)
                    .then(() => {
                        // Update state with updated group invitees
                        this.getGroupInvitees()
                    })
                    .catch(err => this.setState({ error: err }));
            })
            .catch(err => this.setState({ error: err }));
    }

    getDateTime = (date) => {
        const dateStr = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        if (dateStr !== today) {
            return dateStr
        } else {
            return new Date(date).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            })
        }
    }

    render() {
        let { error, group, search, users, members, invitees, isOwner, activities } = this.state
        const userId = parseInt(localStorage.getItem('userId'));
        const recentActivities = activities.slice(0, 5);

        return (
            <>
                {error
                    ? <p>Error retrieving members!</p>
                    : <>
                        <section className="container blog page-container">

                            <div className="row">
                                <div className="col-md-12"> 
                                    <span className="pull-left icon-img-users"><i className="fa fa-users fa-4x"></i></span>
                                    <span className="pull-left">
                                        <h2>{group.name}</h2>
                                    </span>
                                    <span className="pull-right">                                                
                                        <Link to={`/group/${group.id}`} className='blog-title' style={{textDecoration: 'underline' }}>
                                        <h4>Group Chatroom</h4>
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">

                                    <GroupMembersList
                                        isOwner={isOwner}
                                        members={members}
                                        userId={userId}
                                        removeUser={this.removeUser}
                                        getDateTime={this.getDateTime}
                                    />

                                    <GroupInviteesList
                                        isOwner={isOwner}
                                        invitees={invitees}
                                        removeInvitee={this.removeInvitee}
                                        getDateTime={this.getDateTime}
                                    />

                                </div>

                                <aside className="col-md-4 sidebar-padding">
                                    
                                    {isOwner
                                        ? <>
                                            <div className="blog-sidebar">
                                                <h3 className="sidebar-title">Invite New Members</h3>
                                                <hr></hr>
                                                <h4 className="sidebar-title">Search Users: </h4>
                                                <SearchBar
                                                    inputValue={search}
                                                    updateSearch={this.handleSearch}
                                                    clearSearch={this.clearSearch}
                                                />
                                                {this.state.search.length >= 3
                                                    ? <SearchResults
                                                        users={users}
                                                        inviteUser={this.inviteUser}
                                                    />
                                                    : null
                                                }
                                            </div>

                                        </>
                                        : 
                                        <div className="blog-sidebar">
                                            <RecentActivity recentActivities={recentActivities} />
                                        </div>
                                        
                                    }


                                </aside>

                            </div>
                        </section>

                    </>
                }
                
                <Footer/>

            </>
        )
    }
}

export default GroupMembersView;