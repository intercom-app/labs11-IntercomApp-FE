import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from '../Groups/GroupForm';
import { NavLink } from "react-router-dom";
import GroupsBelonged from '../Groups/GroupsBelonged';
import GroupsInvited from '../Groups/GroupsInvited';
import host from '../../host';


class User extends Component {
    state = {
        user: {},
        groupsBelongedTo: [],
        groupsInvitedTo: []
        
    }

    componentWillMount() {
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
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')        
        const groupsBelongedTo = `${host}/api/users/${id}/groupsBelongedTo`;
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

        axios.get(groupsBelongedTo)
            .then(res => {
                this.setState({ groupsBelongedTo: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsBelongedTo: []
                });
            });

    }
    

    render() {
        // console.log('belongs',this.state.groupsBelongedTo)
        // console.log('invited', this.state.groupsInvitedTo)
            // console.log(this.props.groupQuantity)
        
        return (
            <>
                {this.state.error
                    ? <p>Error retrieving user!</p>
                    : <div>
                        {this.state.user.id} {this.state.user.displayName} {this.state.user.email}
                        <p>billing type: {this.state.user.billingSubcription}</p>
                        {/* <NavLink to={`/user/${localStorage.getItem('userId')}/account`}>Account Settings</NavLink> */}
                        <GroupForm  groupQuantity={this.state.groupsBelongedTo.length} /> 
                        <GroupsBelonged groupsBelonged={this.state.groupsBelongedTo}/>
                        <GroupsInvited groupsInvited={this.state.groupsInvitedTo} />                                             
                    </div>
                }
            </>
        );
    }
}

export default User;