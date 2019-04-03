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

    getParticipants = (id) => {
        // console.log(this.state.groupId)
        // console.log(`${host}/api/groups/${this.state.groupId}/callParticipants`)
        const callParticipants = `${host}/api/groups/${this.props.groupId}/callParticipants`;
        axios.get(callParticipants)
            .then(res => {
                // console.log(res.data)
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
            <td>{this.state.callParticipants.length}</td>
         );
    }
}
 
export default CallParticipants;