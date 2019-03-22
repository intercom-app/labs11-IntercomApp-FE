import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Users from '../Users/Users';
import SingleUser from '../Users/SingleUser';
import Team from '../Team/Team';

class Intro extends Component {
    login() {
        this.props.auth.login();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <div>
                            <header>
                                <nav>
                                    <NavLink to="/team">Team Members </NavLink>
                                    <NavLink to="/users">Users </NavLink>
                                </nav>
                            </header>
                            <main>
                                <Route path="/team" component={Team} />
                                <Route exact path="/users" component={Users} />
                                <Route exact path="/users/:id" component={SingleUser} />
                            </main>
                        </div>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h4> You are not logged in!
                        <button onClick={this.login.bind(this)} >
                                Log In
                        </button>
                        </h4>
                    )
                }
            </div>
        );
    }
}

export default Intro;