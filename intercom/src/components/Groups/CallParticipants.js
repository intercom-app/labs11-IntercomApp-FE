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
        this.getParticipants();
    }

    getParticipants = () => {
        const callParticipants = `${host}/api/groups/${this.props.groupId}/callParticipants`;
        axios.get(callParticipants)
            .then(res => {
                this.setState({ callParticipants: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    callParticipants: []
                });
            });
    }

    render() { 
        return ( 
            <>Call Participants:  {this.state.callParticipants.length}</>
        );
    }
}
 
export default CallParticipants;