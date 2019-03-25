import React, { Component } from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';

class Intro extends Component {
    login = () => {
        this.props.auth.login();
=======


class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
>>>>>>> 8bfec73f91dffcf2a3b38e9562ef3f70eeb313c0
    }
    render() { 
        return ( 
            <header className="App-header">
                <p>
                    Welcome to Intercom!
                </p>

<<<<<<< HEAD
    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <header>
                            <nav>
                                <NavLink to="/team">Team Members </NavLink>
                                <NavLink to="/users">Users </NavLink>
                            </nav>
                        </header>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h4> You are not logged in!
                        <button onClick={this.login} >
                            Log In
                        </button>
                        </h4>
                    )
                }
            </div>
        );
=======
            </header>
         );
>>>>>>> 8bfec73f91dffcf2a3b38e9562ef3f70eeb313c0
    }
}
 
export default Intro;