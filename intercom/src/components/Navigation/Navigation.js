import React from 'react';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     Nav,
//     NavItem,
//     NavLink
// } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    renderNavigation = () => {
        if (this.props.isAuthenticated()){
            return <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        {/* <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                            </button> */}
                        <a className="navbar-brand" href="#">VC</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right custom-menu">
                            <li className="active"><a href="#home">My Groups</a></li>
                            <li><a href={`/user/${this.props.id}/account`}>Account</a></li>
                            <li onClick={this.props.logout}><a href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        }else {
            return <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        {/* <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                            </button> */}
                        <a className="navbar-brand" href="#">VC</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right custom-menu">
                            <li><a href="#about">About</a></li>
                            <li><a href="#about">Contact</a></li>                            
                            <li><a href="#meet-team">Team</a></li>
                            <li onClick={this.props.login}><a href="#">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <>
                {this.renderNavigation()}
                
                
                {/* <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="index.html"><img src="images/logo.png" alt="voice chat room" /></a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right custom-menu">
                                <li className="active"><a href="#home">My Groups</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#meet-team">Team</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li onClick={this.props.login}><a href="#">Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav> */}

                
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