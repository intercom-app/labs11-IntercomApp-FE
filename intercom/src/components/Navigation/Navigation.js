import React from 'react';
import { Link } from 'react-router-dom';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     Nav,
//     NavItem,
//     NavLink
// } from 'reactstrap';

export default class Navigation extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isOpen: false
    //     };
    // }

    // toggle = () => {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    render() {
        return (
            <>
                {this.props.isAuthenticated()
                    ?
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href={`/`}>VC</a>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right custom-menu">
                                    <li className="active"><Link to={`/user/${this.props.id}`}>My Groups</Link></li>
                                    <li><Link to={`/user/${this.props.id}/account`}>Account</Link></li>
                                    <li onClick={this.props.logout}><Link to={`/`}>Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    :
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href={`/`}>VC</a>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right custom-menu">
                                    <li><a href="#about">About</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                    <li><a href="#meet-team">Team</a></li>
                                    <li><a href="#login" onClick={this.props.login}>Login</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                }



                {/* <Navbar color="light" light expand="md">
                    <NavLink href={`/user/${this.props.id}`}>Home</NavLink>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href={`/user/${this.props.id}/account`}>
                                    Account Settings
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.logout}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar> */}
            </>
        );
    }
}