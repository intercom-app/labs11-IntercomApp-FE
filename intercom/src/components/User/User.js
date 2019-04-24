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
        groupsOwned: [],
        groupsBelongedTo: [],
        groupsInvitedTo: [],
        recentActivities: [],
        unAuth: false,
        error: false,
    }

    interval = 0

    componentDidMount() {
        this.checkIfUnAuth()
        this.getUserDetailed();
        // Get User Data when component mounts and every 5 seconds while on page
        this.interval = setInterval(() => this.getUserDetailed(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkIfUnAuth = () => {
        const userId = parseInt(localStorage.getItem('userId'));
        const paramsId = parseInt(this.props.match.params.id)
        if (userId !== paramsId) {
            this.setState({ unAuth: true })
        }
    }

    getUserDetailed = () => {
        const id = localStorage.getItem('userId')
        const userEndpoint = `${host}/api/users/${id}/detailed`;
        axios.get(userEndpoint)
            .then(res => {
                this.setState({ user: res.data });
                this.getGroupsOwned(res.data);
                this.getGroupsBelongedTo(res.data);
                this.getGroupsInvitedTo(res.data);
                this.getRecentActivity(res.data);
            })
            .catch(err => {
                this.setState({
                    error: {code: err.response.status, message: err.response.statusText},
                    user: {},
                    groupsOwned: [],
                    groupsBelongedTo: [],
                    groupsInvitedTo: [],
                    recentActivities: [],
                    unAuth: false,
                });
            });
    }

    getGroupsOwned = (user) => {
        // Sort groups owned by when the ownership was created 
        let groupsOwned = [...user.groupsOwned].sort((a, b) => new Date(a.ownershipCreatedAt) - new Date(b.ownershipCreatedAt))
        this.setState({ groupsOwned })
    }

    getGroupsBelongedTo = (user) => {
        // Filter out groups owned
        const groupsOwnedIds = user.groupsOwned.map(group => group.groupId);
        const groupsNotOwned = user.groupsBelongedTo.filter(group => 
            !groupsOwnedIds.includes(group.groupId)
        )

        // Sort groups belonged to by when the membership was created 
        const groupsBelongedTo = [...groupsNotOwned].sort((a, b) => new Date(a.membershipCreatedAt) - new Date(b.membershipCreatedAt))
        this.setState({ groupsBelongedTo })
    }

    getGroupsInvitedTo = (user) => {
        // Filter out groups belonged to 
        const groupsBelongedToIds = user.groupsBelongedTo.map(group => group.groupId);
        const groupsNotBelongedTo = user.groupsInvitedTo.filter(group => 
            !groupsBelongedToIds.includes(group.groupId)
        )

        // Sort groups belonged to by when the invitation was created 
        const groupsInvitedTo = [...groupsNotBelongedTo].sort((a, b) => new Date(a.inviteCreatedAt) - new Date(b.inviteCreatedAt))
        this.setState({ groupsInvitedTo })
    }

    getRecentActivity = (user) => {
        let activities = [];
        // Collect every activity from each group and add group info to activities 
        user.groupsOwned.forEach(group => group.activities.forEach(activity => 
            activities.push({...activity, groupId: group.groupId, groupName: group.groupName})
        ));
        user.groupsBelongedTo.forEach(group => group.activities.forEach(activity => 
            activities.push({...activity, groupId: group.groupId, groupName: group.groupName})
        ));
        user.groupsInvitedTo.forEach(group => group.activities.forEach(activity => 
            activities.push({...activity, groupId: group.groupId, groupName: group.groupName})
        )); 

        // Filter out duplicates
        const filteredActivities = activities.filter((activity, index, self) =>
            index === self.findIndex((i) => ( i.activityId === activity.activityId ))
        )

        // Sort Activities by latest activity first
        filteredActivities.sort((a, b) => new Date(b.activityCreatedAt) - new Date(a.activityCreatedAt) )

        // Take latest 5 actvities
        const recentActivities = filteredActivities.slice(0, 5)
        this.setState({ recentActivities })
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
        let { unAuth, error, user, groupsOwned, groupsBelongedTo, groupsInvitedTo, recentActivities } = this.state
        const avatar = user.avatar || require('../../images/avatar1.png');    
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
                                        getUserDetailed={this.getUserDetailed}
                                    />
                                </div>

                                <aside className="col-md-4 sidebar-padding">
                                    <GroupForm updateGroups={this.getUserDetailed} />
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