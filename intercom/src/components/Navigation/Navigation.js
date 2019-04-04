import React from 'react';
import { Link } from 'react-router-dom';


export default class Navigation extends React.Component {

    render() {
        return (

            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href={`/`} style={{color: "white"}}>
                            <span style={{fontSize: "36px"}}>V</span>
                            <span style={{fontSize: "24px"}}>oice{' '}</span>
                            <i className="material-icons" style={{fontSize: "32px"}}>hearing</i>
                            <span style={{fontSize: "24px"}}>hatroom</span>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {this.props.isAuthenticated()
                            ?
                            <ul className="nav navbar-nav navbar-right custom-menu">
                                <li className="active"><Link to={`/user/${this.props.id}`}>My Groups</Link></li>
                                <li><Link to={`/user/${this.props.id}/account`}>Account</Link></li>
                                <li onClick={this.props.logout}><Link to={`/`}>Logout</Link></li>
                            </ul>
                            :
                            <ul className="nav navbar-nav navbar-right custom-menu">
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="#meet-team">Team</a></li>
                                <li><a href="#login" onClick={this.props.login}>Login</a></li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>

        );
    }
}