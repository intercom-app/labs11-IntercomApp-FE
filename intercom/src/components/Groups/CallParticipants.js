import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class CallParticipants extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            callParticipants: []
         }
    }

    componentDidMount() {
        // Get Call Participants every 3 seconds in case call happens while on page
        this.interval = setInterval(() => this.getParticipants(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getParticipants = () => {
        const callParticipants = `${host}/api/groups/${this.props.groupId}/callParticipants`;
        axios.get(callParticipants)
            .then(res => {
                this.setState({ callParticipants: res.data })
            })
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