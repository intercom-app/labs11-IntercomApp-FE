import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class CallParticipants extends Component {
    state = { 
        callParticipants: []
    }

    interval = 0

    componentDidMount() {
        // Get Call Participants every second in case call happens while on page
        this.interval = setInterval(() => this.getParticipants(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getParticipants = () => {
        axios.get(`${host}/api/groups/${this.props.groupId}/callParticipants`)
            .then(res =>  this.setState({ callParticipants: res.data }))
            .catch(() => this.setState({ callParticipants: [] })); // if error default to none
    }

    render() { 
        return ( 
            <>
                {this.state.callParticipants.length === 0 ? null : 
                <>On Call:  {this.state.callParticipants.length}</>
                }
            </>
        );
    }
}
 
export default CallParticipants;