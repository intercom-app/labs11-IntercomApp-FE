import React, { Component } from 'react';
import axios from 'axios';
import host from '../../host';

import UnAuth from '../UnAuth/UnAuth';
import Error from '../Error/Error';
import GroupForm from '../Groups/GroupForm';
import GroupsBelonged from '../Groups/GroupsBelonged';
import GroupsInvited from '../Groups/GroupsInvited';
import GroupsOwned from '../Groups/GroupsOwned';
import RecentActivity from '../RecentActivity/RecentActivity';
import Footer from "../LandingPage/Footer";

class User extends Component {
    state = {
        user: {},
        groupsBelongedTo: [],
        groupsInvitedTo: [],
        groupsOwned: [],
        activities: [],
        unAuth: false,
        error: false,
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')
        this.checkIfUnAuth(id)
        this.getUser(id);
        this.getGroupsOwned(id);
        // Groups belonged to is called after groups owned
        // Groups invited to is called after groups belonged to
        document.cookie = 'color: blue; expires= Thu, 30 Aug 2019 19:00:00 UTC'

    }

    checkIfUnAuth = (id) => {
        const userId = parseInt(id);
        const paramsId = parseInt(this.props.match.params.id)
        if (userId !== paramsId) {
            this.setState({ unAuth: true })
        }
    }

    getUser = (id) => {
        const userEndpoint = `${host}/api/users/${id}`;
        axios.get(userEndpoint)
            .then(res => {
                this.setState({ user: res.data })
            })
            .catch(err => {
                this.setState({
                    error: {code: err.response.status, message: err.response.statusText},
                    user: {},
                });
            });
    }

    getGroupsOwned = (id) => {
        const groupsOwned = `${host}/api/users/${id}/groupsOwned`;

        axios.get(groupsOwned)
            .then(res => {
                this.setState({ groupsOwned: res.data })
                this.getGroupsBelongedTo(id, res.data);
                this.getRecentActivity(res.data);
            })
            .catch(() => this.setState({ groupsOwned: [] }));
    }

    getGroupsBelongedTo = (id, groupsOwned) => {
        const groupsBelongedTo = `${host}/api/users/${id}/groupsBelongedTo`;

        axios.get(groupsBelongedTo)
            .then(res => {
                const groupsOwnedIds = groupsOwned.map(group => group.groupId);
                const groupsNotOwned = res.data.filter(group => 
                    !groupsOwnedIds.includes(group.groupId)
                )
                this.setState({ groupsBelongedTo: groupsNotOwned })
                this.getGroupsInvitedTo(id, groupsNotOwned);
                this.getRecentActivity(groupsNotOwned);
            })
            .catch(() => this.setState({ groupsBelongedTo: [] }));
    }

    getGroupsInvitedTo = (id, groupsBelongedTo) => {
        const groupsInvitedTo = `${host}/api/users/${id}/groupsInvitedTo`;
        axios.get(groupsInvitedTo)
            .then(res => {
                const groupsBelongedToIds = groupsBelongedTo.map(group => group.groupId);
                const groupsNotBelongedTo = res.data.filter(group => 
                    !groupsBelongedToIds.includes(group.groupId)
                )
                this.getOwners(groupsNotBelongedTo);
                this.getRecentActivity(groupsNotBelongedTo);
            })
            .catch(() => this.setState({ groupsInvitedTo: [] }));
    }

    getOwners = (groups) => {
        if (groups.length > 0) {
            groups.forEach(group => {
                axios.get(`${host}/api/groups/${group.groupId}/groupOwners`)
                .then(res => {
                    let groupsInvitedTo = [];
                    const groupWithOwner = {...group, groupOwner: res.data[0].displayName}
                    const groupsWithOwner = groupsInvitedTo.concat(groupWithOwner)

                    // const filteredGroups = groupsWithOwner.filter((group, index, self) =>
                    //     index === self.findIndex((i) => ( i.groupId === group.groupId ))
                    // )

                    this.setState({ groupsInvitedTo: groupsWithOwner });
                })
                .catch(() => this.setState({ groupsInvitedTo: [] }));
            })
        } else {
            this.setState({ groupsInvitedTo: [] });           
        }
    }

    getRecentActivity = (groups) => {
        groups.forEach(group => {
            axios.get(`${host}/api/groups/${group.groupId}/activities`)
            .then(res => {
                const activities = res.data.map( activity => {
                    return {...activity, groupId: group.groupId, groupName: group.GroupName}
                })
                const updatedActivities = this.state.activities.concat(activities)

                const filteredActivities = updatedActivities.filter((activity, index, self) =>
                    index === self.findIndex((i) => ( i.id === activity.id ))
                )

                filteredActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) )
                this.setState({ activities: filteredActivities });
            })
            .catch(() => this.setState({ activities: [] }));
        })
    }

    updateGroups = () => {
        const id = localStorage.getItem('userId')
        this.getGroupsOwned(id);
        // Groups belonged to is called after groups owned
        // Groups invited to is called after groups belonged to
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
        let { unAuth, error, user, groupsOwned, groupsBelongedTo, groupsInvitedTo, activities } = this.state
        const avatar = user.avatar || require('../../images/avatar1.png');    
        const recentActivities = activities.slice(0, 5)
        return (
            <>
                { unAuth ? <UnAuth auth={this.props.auth}/> : 
                <>
                { error ? <Error error={error}/> : 
                    <>
                        <section className="container blog page-container">

                            <div className="row">
                                <div className="col-md-12"> 
                                    <div className="page-icon-flex">
                                        <img className="avatar-img-users" src={avatar} alt="user avatar" />  
                                        <h2>Welcome {user.displayName}!</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">
                                    <GroupsOwned groupsOwned={groupsOwned} />
                                    <GroupsBelonged groupsBelonged={groupsBelongedTo} />
                                    <GroupsInvited 
                                        groupsInvited={groupsInvitedTo} 
                                        updateGroups={this.updateGroups}
                                    />
                                </div>

                                <aside className="col-md-4 sidebar-padding">
                                    <GroupForm updateGroups={this.updateGroups} />
                                    <RecentActivity 
                                        recentActivities={recentActivities} 
                                        getDateTime={this.getDateTime}
                                    />
                                </aside>
                            </div>
                        </section>

                        <Footer/>
                    </>
                }</>
            }</>
        );
    }
}

export default User;