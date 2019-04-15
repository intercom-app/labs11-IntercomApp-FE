import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';


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

    window.$(document).ready(function(){
      window.$(this).scrollTop(0);
    });
  }

  componentDidUpdate = () => {
    window.$(document).ready(function(){
      window.$(this).scrollTop(0);
    });
  }

  render() {

    const id = localStorage.getItem('userId');

    return (
      <>
        <Navigation id={id} login={this.login} logout={this.logout} isAuthenticated={this.props.auth.isAuthenticated} />
      </>
    )
  }
}

export default App;