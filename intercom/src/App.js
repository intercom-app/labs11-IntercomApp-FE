import React, { Component } from 'react';

import './App.css';

class App extends Component {

  goTo = () => {
    this.props.history.replace(`/intro`)
  }

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

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
        <button onClick={this.goTo}>
          Home
        </button>
        {
          !isAuthenticated() && (
            <button onClick={this.login}>
              Log In
            </button>
          )
        }
        {
          isAuthenticated() && (
            <button onClick={this.logout}>
              Log Out
            </button>
          )
        }
      </div>

    )
  }
}

export default App;
