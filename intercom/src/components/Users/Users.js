import React, { Component } from 'react';
import axios from "axios";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: {}
         }
    }

    componentDidMount() {
        axios
        .get("https://intercom-be.herokuapp.com/api/users")
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
                {this.state.users.map(user => {
                    return <h1>{user}</h1>
                })}
            </div>
         );
    }
}
 
export default Users;