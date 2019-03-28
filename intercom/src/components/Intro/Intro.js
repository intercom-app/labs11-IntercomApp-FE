import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Intro extends Component {
    login = () => {
        this.props.auth.login();
    }

    render() { 
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <header>
                            <div>Hello, {localStorage.getItem('nickname')}</div>
                            <nav>
                                <NavLink to="/team">Team Members </NavLink>
                                <NavLink to="/users">Users </NavLink>
                                <NavLink to="/groups">Groups </NavLink>                                
                            </nav>
                        </header>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h4> You are not logged in!
                        {/* <button onClick={this.login} >
                            Log In
                        </button> */}
                        </h4>
                    )
                }
            </div>
        );
    }
}
 
export default Intro;