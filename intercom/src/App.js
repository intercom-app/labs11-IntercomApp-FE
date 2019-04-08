import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import LandingPageView from './components/LandingPage/LandingPageView';

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

    const id = localStorage.getItem('userId');

    return (
      <>
        <Navigation id={id} login={this.login} logout={this.logout} isAuthenticated={this.props.auth.isAuthenticated} />
        <LandingPageView />
      </>
    )
  }
}

export default App;