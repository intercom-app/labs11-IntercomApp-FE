import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class CallStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callStatus: '',
            error: ''
        }
    }

    componentDidMount() {
        this.getParticipants();
    }

    getParticipants = (id) => {
        const callStatus = `${host}/api/groups/${this.props.groupId}/callStatus`;
        axios.get(callStatus)
            .then(res => {
                this.setState({ callStatus: res.data.callStatus })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err.response.data.message,
                    callStatus: ''
                });
            });
    }

    render() {
        return (
            <td>{this.state.callStatus === 1 ? 'active' : 'inactive'}</td>
        );
    }
}

export default CallStatus;