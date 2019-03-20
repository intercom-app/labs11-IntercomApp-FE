import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Users from './components/Users/Users';
import Intro from './components/Intro/Intro';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Intro} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
