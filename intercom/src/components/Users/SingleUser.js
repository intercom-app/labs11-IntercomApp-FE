import React, { Component } from 'react';
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.match.params.id,
            users: []
         }
    }

    componentDidMount() {
        axios
        .get(`${host}/api/users/${this.state.id}`)
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
                <div key={this.state.users.id}>
                 {this.state.users.id} {this.state.users.firstName} {this.state.users.lastName} {this.state.users.displayName} {this.state.users.phoneNumber}
                </div>
          </div>
        );
      }
    }
 
export default SingleUser;