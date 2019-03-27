import React, { Component } from 'react';
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.match.params.id,
            user: []
         }
    }

    componentDidMount() {
        axios
        .get(`${host}/api/users/${this.state.id}`)
            // .get(`http://localhost:3300/api/users/${this.state.id}`)
        
            // console.log(this.state.id)
        .then(res => {
            console.log(res)
          this.setState({user: res.data})
        })
        .catch(err => {
            console.error(err);
        })
    }

    render() {
        return (
          <div>
            {console.log(this.state.user)}

                <div key={this.state.user.id}>
                    {this.state.user.id} {this.state.user.firstName} {this.state.user.lastName} {this.state.user.displayName} {this.state.user.phoneNumber} {this.state.user.email}
                </div>
          </div>
        );
      }
    }
 
export default SingleUser;