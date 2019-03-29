import React, { Component } from 'react';
import { Link } from "react-router-dom";
import GroupForm from '../Groups/GroupForm';
import { NavLink } from "react-router-dom";
import { Button } from 'reactstrap';
import host from "../../host.js";
import axios from 'axios';
import history from '../../history';



class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,                        
        }
    }

    deleteAccount = (id) => {
        axios
            .delete(`${host}/api/users/${id}`)
            .then(deletedUser => {
            })
            .catch(err => {
                console.log(err);
            });
            this.props.auth.logout()

        }
        
        render() {
            // console.log(this.props.auth.logout)

        return (<div>
            <h2>Account Settings</h2>
            <Button color="danger" onClick={() => this.deleteAccount(this.state.id)}>Delete Account</Button>
            
        </div>);
    }
}

export default AccountSettings;