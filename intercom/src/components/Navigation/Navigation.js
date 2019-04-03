import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="index.html">VC</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right custom-menu">
                                <li className="active"><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#meet-team">Team</a></li>
                                <li><a href="#portfolio1">Portofolio</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="single-post.html">Single</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
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