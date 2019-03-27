import React, { Component } from "react";
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get(`${host}/api/users`)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        {/* {console.log(this.state.users)} */}
        {this.state.users.map(user => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <div >
             {user.id} {user.firstName} {user.lastName} {user.displayName} {user.phoneNumber}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Users;
