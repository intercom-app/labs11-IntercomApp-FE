import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from '../Groups/GroupForm';
import UnAuth from './UnAuth';
import GroupsBelonged from '../Groups/GroupsBelonged';
import GroupsInvited from '../Groups/GroupsInvited';
import GroupsOwned from '../Groups/GroupsOwned';
import host from '../../host';

class User extends Component {
    state = {
        user: {},
        groupsBelongedTo: [],
        groupsInvitedTo: [],
        groupsOwned: []
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')
        const userEndpoint = `${host}/api/users/${id}`;

        axios.get(userEndpoint)
            .then(res => {
                // console.log(res.data)
                this.setState({ user: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    user: {},
                });
            });
        this.getgroupsOwned(id);
        this.getGroupsInvitedTo(id);
        // Groups belonged to is called after groups owned
    }


    getGroupsInvitedTo = (id) => {
        const groupsInvitedTo = `${host}/api/users/${id}/groupsInvitedTo`;

        axios.get(groupsInvitedTo)
            .then(res => {
                this.setState({ groupsInvitedTo: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsInvitedTo: []
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
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsBelongedTo: []
                });
            });
    }

    getgroupsOwned = (id) => {
        const groupsOwned = `${host}/api/users/${id}/groupsOwned`;

        axios.get(groupsOwned)
            .then(res => {
                this.setState({ groupsOwned: res.data })
                this.getgroupsBelongedTo(id, res.data);
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsOwned: []
                });
            });
    }

    updateGroups = () => {
        const id = localStorage.getItem('userId')
        this.getgroupsOwned(id);
        this.getGroupsInvitedTo(id);
        // Groups belonged to is called after groups owned
    }


    render() {
        let { error, user, groupsOwned, groupsBelongedTo, groupsInvitedTo } = this.state
        const avatar = this.state.user.avatar || require('../../images/avatar1.png');        
        return (
            <>
                {parseInt(localStorage.getItem('userId')) !== parseInt(this.props.match.params.id) ?
                    <UnAuth/> : 
                <>
                {error
                    ? <p>Error retrieving user!</p>
                    : <>
                        <section className="container blog">
                            <div className="row">
                                <div className="col-md-8">

                                    <div>
                                        <img className="media-object pull-left avatar-img-users" src={avatar} alt="" />  
                                        <span className="comments-padding"></span>                                                                              
                                        <h2>Welcome {user.displayName}!</h2>
                                        {/* <span>{user.email}</span> */}
                                    </div>

                                    <GroupsOwned groupsOwned={groupsOwned} />
                                    <GroupsBelonged groupsBelonged={groupsBelongedTo} />
                                    <GroupsInvited groupsInvited={groupsInvitedTo} updateGroups={this.updateGroups} />

                                </div>

                                <GroupForm groupQuantity={groupsOwned.length} updateGroups={this.updateGroups} />

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