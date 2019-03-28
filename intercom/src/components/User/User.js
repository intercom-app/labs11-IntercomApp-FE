import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import GroupForm from '../Groups/GroupForm';
import host from '../../host';


class User extends Component {
    state = {
        user: {},
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

    render() {
        return (
            <>
                {this.state.error
                    ? <p>Error retrieving user!</p>
                    : <div>
                        {this.state.user.id} {this.state.user.displayName} {this.state.user.email}
                        <GroupForm id={this.state.id} />

                        <Link to={`/group/${1}`}>
                            Group 1
                        </Link>

                    </div>
                }
            </>
        );
    }
}

export default User;