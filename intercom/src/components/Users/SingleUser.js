import React, { Component } from 'react';
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.match.params.id,
            users: {}
         }
    }

    componentDidMount() {
        axios
        .get(`${host}/api/user/:id`)
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
 
export default SingleUser;