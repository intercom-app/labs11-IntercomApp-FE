import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from '../Groups/GroupForm';
import UnAuth from './UnAuth';
import GroupsBelonged from '../Groups/GroupsBelonged';
import GroupsInvited from '../Groups/GroupsInvited';
import GroupsOwned from '../Groups/GroupsOwned';
import host from '../../host';
import RecentActivity from '../RecentActivity/RecentActivity';

class User extends Component {
    state = {
        user: {},
        groupsBelongedTo: [],
        groupsInvitedTo: [],
        groupsOwned: [],
        activities: [],
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')
        const userEndpoint = `${host}/api/users/${id}`;

        axios.get(userEndpoint)
            .then(res => {
                this.setState({ user: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    user: {},
                });
            });
        this.getgroupsOwned(id);
        // Groups belonged to is called after groups owned
        this.getGroupsInvitedTo(id);

    }

    getgroupsOwned = (id) => {
        const groupsOwned = `${host}/api/users/${id}/groupsOwned`;

        axios.get(groupsOwned)
            .then(res => {
                this.setState({ groupsOwned: res.data })
                this.getgroupsBelongedTo(id, res.data);
                this.getRecentActivity(res.data);
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsOwned: []
                });
            });
    }

    getgroupsBelongedTo = (id, groupsOwned) => {
        const groupsBelongedTo = `${host}/api/users/${id}/groupsBelongedTo`;

        axios.get(groupsBelongedTo)
            .then(res => {
                const groupsOwnedIds = groupsOwned.map(group => group.groupId);
                const groupsNotOwned = res.data.filter(group => 
                    !groupsOwnedIds.includes(group.groupId)
                )
                this.setState({ groupsBelongedTo: groupsNotOwned })
                this.getRecentActivity(groupsNotOwned);
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsBelongedTo: []
                });
            });
    }

    getGroupsInvitedTo = (id) => {
        const groupsInvitedTo = `${host}/api/users/${id}/groupsInvitedTo`;

        axios.get(groupsInvitedTo)
            .then(res => {
                this.setState({ groupsInvitedTo: res.data })
                this.getOwners(res.data);
                this.getRecentActivity(res.data);
            })
            .catch(err => {
                this.setState({
                    error: err,
                    groupsInvitedTo: []
                });
            });
    }

    getOwners = (groups) => {
        groups.forEach(group => {
            axios.get(`${host}/api/groups/${group.groupId}/groupOwners`)
            .then(res => {
                const groupWithOwner = {...group, groupOwner: res.data[0].displayName}
                const groupsWithOwner = this.state.groupsInvitedTo.concat(groupWithOwner)

                const filteredGroups = groupsWithOwner.filter((group, index, self) =>
                index === self.findIndex((i) => ( i.groupId === group.groupId ))
                )

                this.setState({
                    groupsInvitedTo: filteredGroups
                });
            })
            .catch(err => console.error(err));           
        })
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
                this.setState({
                    activities: filteredActivities
                });
            })
            .catch(err => console.error(err));           
        })
    }

    updateGroups = () => {
        const id = localStorage.getItem('userId')
        this.getgroupsOwned(id);
        this.getGroupsInvitedTo(id);
        // Groups belonged to is called after groups owned
    }

    render() {
        let { error, user, groupsOwned, groupsBelongedTo, groupsInvitedTo, activities } = this.state
        const avatar = this.state.user.avatar || require('../../images/avatar1.png');    
        const recentActivities = activities.slice(0, 5)
        return (
            <>
                {parseInt(localStorage.getItem('userId')) !== parseInt(this.props.match.params.id) ?
                    <UnAuth/> : 
                <>
                {error
                    ? <h1>Error retrieving user!</h1>
                    : <>
                        <section className="container blog">

                            <div className="row">
                                <div className="col-md-12"> 
                                    <img className="media-object pull-left avatar-img-users" src={avatar} alt="" />  
                                    <span className="comments-padding"></span>                                                                              
                                    <h2>Welcome {user.displayName}!</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">
                                    <GroupsOwned groupsOwned={groupsOwned} />
                                    <GroupsBelonged groupsBelonged={groupsBelongedTo} />
                                    <GroupsInvited groupsInvited={groupsInvitedTo} updateGroups={this.updateGroups} />
                                </div>

                                <aside className="col-md-4 sidebar-padding">

                                    <GroupForm updateGroups={this.updateGroups} />
                                    <RecentActivity recentActivities={recentActivities} avatar={avatar}/>

                                </aside>
                            </div>
                        </section>
                    </>
                }</>
            }
            </>
        );
    }
}

export default User;