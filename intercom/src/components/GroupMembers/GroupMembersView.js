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
        axios
            .get(`${host}/api/groups/${this.state.id}`)
            .then(res => {
                this.setState({ group: res.data });
            })
            .catch(err => this.setState({ error: err }));

        axios
            .get(`${host}/api/groups/${this.state.id}/groupMembers`)
            .then(res => {
                this.setState({
                    members: res.data,
                    search: '',
                });
            })
            .catch(err => this.setState({ error: err }));

        axios
            .get(`${host}/api/groups/${this.state.id}/groupMembers/detailed`)
            .then(res => {
                res.data.map()
                this.setState({
                    membersDetails: res.data
                });
            })
            .catch(err => this.setState({ error: err }));
        
        axios.get(`${host}/api/groups/${this.state.id}/activities`)
            .then(res => {
                const activities = res.data.map(activity => {
                    // console.log(activity)
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

        axios
            .get(`${host}/api/groups/${this.state.id}/groupInvitees`)
            .then(res => {
                this.setState({ invitees: res.data });
            })
            .catch(err => this.setState({ error: err }));

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
        this.setState({ search: '', users: []})
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
                        this.setState({ membersDetails: res.data });
                    })
                    .catch(err => this.setState({ error: err }));
            })
            .catch(err => this.setState({ error: err }));
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
                    .catch(err => this.setState({ error: err }));
            })
            .catch(err => this.setState({ error: err }));
    }

    render() {
        let { error, group, search, users, members, membersDetails, invitees, isOwner, activities } = this.state
        const userId = parseInt(localStorage.getItem('userId'));
        const recentActivities = activities.slice(0, 5);
        const style = { color: "#9d9d9d", fontSize: "13px", paddingTop: '17px'}
        return (
            <>
                {error
                    ? <p>Error retrieving members!</p>
                    : <>
                        <section className="container blog page-container">
                            <div className="row">
                                <div className="col-md-8">
                                    
                                    <h2>{group.name}</h2>

                                    <GroupMembersList
                                        isOwner={isOwner}
                                        membersDetails={membersDetails}
                                        userId={userId}
                                        removeUser={this.removeUser}
                                    />

                                    <GroupInviteesList
                                        isOwner={isOwner}
                                        invitees={invitees}
                                        removeInvitee={this.removeInvitee}
                                    />

                                </div>

                                <aside className="col-md-4 sidebar-padding">
                                    
                                    {isOwner
                                        ? <>
                                            <div className="blog-sidebar">
                                                <Link to={`/group/${group.id}`} className='sidebar-title-group-chatroom'>
                                                    Group Chatroom
                                                </Link>
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
                                            <Link to={`/group/${group.id}`} className='sidebar-title-group-chatroom'>
                                                Group Chatroom
                                            </Link>
                                            <RecentActivity recentActivities={recentActivities} style={style} />
                                        </div>
                                        
                                    }


                                </aside>

                            </div>
                        </section>

                    </>
                }
                {/* <Link to={`/group/${id}`}>
                    Back to Group
                </Link>

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

                <GroupMembersList
                    isOwner={isOwner}
                    members={members}
                    userId={userId}
                    removeUser={this.removeUser}
                />

                <GroupInviteesList
                    isOwner={isOwner}
                    invitees={invitees}
                    removeInvitee={this.removeInvitee}
                /> */}

                
                <Footer/>

            </>
        )
    }
}

export default GroupMembersView;