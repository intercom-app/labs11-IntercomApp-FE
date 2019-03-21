import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

// import Auth from './Auth/Auth';

// import Users from './components/Users/Users';
// import SingleUser from './components/Users/SingleUser';
// import Intro from './components/Intro/Intro';
// import Team from './components/Team/Team';
// import Register from './components/Register/Register';

import './App.css';

class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <>

      <div>
        <button onClick={this.goTo.bind(this, 'intro')}>
          Home
        </button>
        {
          !isAuthenticated() && (
            <button onClick={this.login.bind(this)}>
              Log In
            </button>
          )
        }
        {
          isAuthenticated() && (
            <button onClick={this.logout.bind(this)}>
              Log Out
            </button>
          )
        }
      </div>

      {/* <Router>
        <div className="App">
          <header>
            <nav>
              <NavLink to="/team">Team Members </NavLink>
              <NavLink to="/users">Users </NavLink>
            </nav>
          </header>
          <main>
            <Route exact path="/" component={Intro} />
            <Route path="/team" component={Team} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route path="/register" component={Register} />
          </main>
        </div>
      </Router> */}

    </>
    )
  }
}

export default App;
