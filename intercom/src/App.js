import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Users from './components/Users/Users';
import SingleUser from './components/Users/SingleUser';
import Intro from './components/Intro/Intro';
import Team from './components/Team/Team';
import Register from './components/Register/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
