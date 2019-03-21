import React, { Component } from 'react';

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
                    <h4>You are logged in!</h4>
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