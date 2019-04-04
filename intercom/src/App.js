import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';

import './App.css';

class App extends Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  componentDidMount = () => {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {

    // const { isAuthenticated } = this.props.auth;
    const id = localStorage.getItem('userId');

    return (

      <div>
        {/* {
          !isAuthenticated() && (
            <button onClick={this.login}>
              Log In
            </button>
          )
        } */}
        {
          // isAuthenticated() && (
            <>
            <Navigation id={id} login={this.login} logout={this.logout} isAuthenticated={this.props.auth.isAuthenticated}/>
              {/* <NavLink to={`/user/${id}`}>Home</NavLink> */}

              {/* <button onClick={this.logout}>Log Out</button> */}
            </>
          // )
        }
        
      </div>

    )
  }
}

export default App;