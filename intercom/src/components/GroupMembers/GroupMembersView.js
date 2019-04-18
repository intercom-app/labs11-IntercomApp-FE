import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import axios from "axios";
import host from "../../host.js";

import UnAuth from '../UnAuth/UnAuth';
import Error from '../Error/Error';
import GroupMembersList from './GroupMembersList.js';
import GroupInviteesList from './GroupInviteesList.js';
import RecentActivity from '../RecentActivity/RecentActivity';
import SearchBar from '../Search/SearchBar';
import SearchResults from '../Search/SearchResults';
import Footer from '../LandingPage/Footer';

class GroupMembersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            group: {},
            members: [],
            membersDetails: [],
            activities: [],
            invitees: [],
            users: [],
            search: '',
            isOwner: false,
            unAuth: false,
            error: false,
        };
    }

    componentDidMount() {
        this.checkIfUnAuth()
        this.getGroup()
        this.getGroupMembers()
        this.getGroupInvitees()
        this.checkIfOwner();
    }

    checkIfUnAuth = () => {
        const groupId = parseInt(this.state.id) 
        const userId = localStorage.getItem('userId')
        axios
            .get(`${host}/api/users/${userId}/groupsBelongedTo`)
            .then(res => {
                const groupIds = res.data.map(group => group.groupId)
                if (!groupIds.includes(groupId)){
                    this.setState({ unAuth: true })
                }
            })
            .catch(err => {
                this.setState({ error: {code: err.response.status, message: err.response.statusText} })
            });        
    }

    getGroup = () => {
        axios
            .get(`${host}/api/groups/${this.state.id}`)
            .then(res => { 
                this.setState({ group: res.data }) 
                this.getGroupActivities(res.data)
            })
            .catch(err => {
                this.setState({
                    error: {code: err.response.status, message: err.response.statusText},
                    group: {},
                });
            });
    }

    getGroupMembers = () => {
        axios
            .get(`${host}/api/groups/${this.state.id}/groupMembers/detailed`)
            .then(res => this.setState({ members: res.data }) )
            .catch(() => this.setState({ members: [] }));
    }

    getGroupInvitees = () => {
        axios
            .get(`${host}/api/groups/${this.state.id}/groupInvitees/detailed`)
            .then(res => this.setState({ invitees: res.data }) )
            .catch(() => this.setState({ invitees: [] }));
    }

    getGroupActivities = (group) => {
        axios
            .get(`${host}/api/groups/${group.id}/activities`)
            .then(res => {
                const activities = res.data.map(activity => {
                    return { ...activity, groupId: group.id, groupName: group.name}
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
            .catch(() => this.setState({ activities: [] }));
    }

    checkIfOwner = () => {
        const userId = parseInt(localStorage.getItem('userId'));
        axios
            .get(`${host}/api/groups/${this.state.id}/groupOwners`)
            .then(res => {
                res.data[0].userId === userId 
                ? this.setState({ isOwner: true })
                : this.setState({ isOwner: false })               
            })
            .catch(() => this.setState({ isOwner: false }))
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
                this.state.invitees.forEach(invitee => {
                    if (invitee.id === user.id) {
                        buttonInvite = false
                    }
                })
                this.state.members.forEach(member => {
                    if (member.id === user.id) {
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
            .post(`${host}/api/groups/${this.state.id}/groupInvitees`, { userId: id })
            .then(() => {
                // Update state with updated group invitees 
                this.setState({ users: users })
                this.getGroupInvitees()
                // Add to group activities - whether or not posted still want to get activities and not render error
                axios
                    .post(`${host}/api/groups/${this.state.id}/activities`, activity)
                    .then(() => this.getGroupActivities())
                    .catch(() => this.getGroupActivities());
            })
            .catch(err => {
                this.clearSearch()
                this.setState({ error: {code: err.response.status, message: err.response.statusText} }); 
            });
    }

    clearSearch = () => {
        this.setState({ search: '', users: []})
    }

    removeUser = (e, id, userDisplayName) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Removed ${userDisplayName} from the group` }
        // Delete member - If error in deleting, don't want to post to activities and want to throw error
        axios
            .delete(`${host}/api/groups/${this.state.id}/groupMembers/${id}`)
            .then(() => {
                // Update state with updated group members
                this.getGroupMembers()
                // Add to group activities - whether or not posted still want to get activities and not render error
                axios
                    .post(`${host}/api/groups/${this.state.id}/activities`, activity)
                    .then(() => this.getGroupActivities())
                    .catch(() => this.getGroupActivities());
            })
            .catch(err => { 
                this.setState({ error: {code: err.response.status, message: err.response.statusText} })
            });
    }


    removeInvitee = (e, id, userDisplayName) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId')
        const activity = { userId, activity: `Cancelled ${userDisplayName}'s invitation.` }
        // Delete Invitee - If error in deleting, don't want to post to activities and want to throw error
        axios
            .delete(`${host}/api/groups/${this.state.id}/groupInvitees/${id}`)
            .then(() => {
                // Update state with updated group invitees
                this.getGroupInvitees()
                // Add to group activities - whether or not posted still want to get activities and not render error
                axios
                    .post(`${host}/api/groups/${this.state.id}/activities`, activity)
                    .then(() => this.getGroupActivities())
                    .catch(() => this.getGroupActivities());
            })
            .catch(err => { 
                this.setState({ error: {code: err.response.status, message: err.response.statusText} })
            });
    }

    getDateTime = (date) => {
        const today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const dateStr = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const todayYear = new Date().toLocaleDateString(undefined, { year: 'numeric' });
        const dateStrYear = new Date(date).toLocaleDateString(undefined, { year: 'numeric' });

        if (dateStr === today) { // if activity happened today, return time
            return new Date(date).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            })
        } else if (todayYear === dateStrYear) { // if activity happened this year, return month and day
            return new Date(date).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
            });
        } else { // if activity happened before this year, return month day and year
            return dateStr
        }
    }

    render() {
        let { unAuth, error, group, search, users, members, invitees, isOwner, activities } = this.state
        const userId = parseInt(localStorage.getItem('userId'));
        const recentActivities = activities.slice(0, 5);

        return (
            <>
                { unAuth ? <UnAuth/> : 
                <>
                {error ? <Error error={error}/> : 
                    <>
                        <section className="container blog page-container">

                            <div className="row">
                                <div className="col-md-12 page-header-flex"> 
                                    <div className="page-icon-flex">
                                        <i className="fa fa-users fa-4x"></i>
                                        <h2>{group.name}</h2>
                                    </div>                                                                                  
                                    <Link to={`/group/${group.id}`} className='blog-title' style={{textDecoration: 'underline' }}>
                                        <h4>Group Chatroom</h4>
                                    </Link>
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
                                                <p>Search for users by name or email to invite.</p>
                                            </div>

                                        </>
                                        : 
                                        <RecentActivity 
                                            recentActivities={recentActivities} 
                                            getDateTime={this.getDateTime}
                                        />
                                        
                                        
                                    }


                                </aside>

                            </div>
                        </section>

                    </>
                }
                
                <Footer/>
                </>}
            </>
        )
    }
}

export default GroupMembersView;