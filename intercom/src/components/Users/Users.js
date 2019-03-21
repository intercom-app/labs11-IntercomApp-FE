import React, { Component } from 'react';
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: {}
         }
    }

    componentDidMount() {
        axios
        .get(`${host}/api/user`)
        .then(res => {
          this.setState({users: res.data})
        })
        .catch(err => {
            console.error(err);
        })
    }

    render() { 
        return ( 
            <div>
                buusds
                {/* this.state.users.map(user => {
                    <Link to={`/users/${user.id}`}><div key={user.id}> {user.firstName} {user.lastName}</div></Link>
                }) */}
            </div>
         );
    }
}
 
export default Users;