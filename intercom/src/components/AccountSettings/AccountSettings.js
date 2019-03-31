import React, { Component } from 'react';
import { Button } from 'reactstrap'
import host from "../../host.js";
import axios from 'axios';



class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,                        
        }
    }

    deleteAccount = (id) => {
        const activity = { userId: localStorage.getItem('userId'), activity: 'Left group due to account terminatio .' }        
        // axios
        //     .post(`${host}/api/groups/${this.state.group.id}/activities`, activity) //recekve group id
        //     .then(activity => {
        //         console.log(activity)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

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

        return (<div>
            <h2>Account Settings</h2>
            <p></p>
            <Button color="danger" onClick={() => this.deleteAccount(this.state.id)}>Delete Account</Button>
            
        </div>);
    }
}

export default AccountSettings;