import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from '../Groups/GroupForm';
import GroupsBelonged from '../Groups/GroupsBelonged';
import host from '../../host';

class User extends Component {
    state = {
        user: {},
        groupsBelongedTo: []
    }

    componentWillMount() {
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
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')        
        const groupsBelongedTo = `${host}/api/users/${id}/groupsBelongedTo`;
        console.log(groupsBelongedTo)
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
        console.log(this.state.groupsBelongedTo)
        return (
            <>
                {this.state.error
                    ? <p>Error retrieving user!</p>
                    : <div>
                        {this.state.user.id} {this.state.user.displayName} {this.state.user.email}
                        <GroupForm id={this.state.id} /> 
                        <GroupsBelonged groupsBelonged={this.state.groupsBelongedTo}/>                     
                    </div>
                }
            </>
        );
    }
}

export default User;