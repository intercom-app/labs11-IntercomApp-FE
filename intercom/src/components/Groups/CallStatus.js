import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class CallStatus extends Component {
    state = {
        callStatus: false,
    }

    interval = 0

    componentDidMount() {
        // Get Call Status every second in case call happens while on page
        this.interval = setInterval(() => this.getCallStatus(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getCallStatus = () => {
        axios.get(`${host}/api/groups/${this.props.groupId}/callStatus`)
            .then(res => this.setState({ callStatus: res.data.callStatus }))
            .catch(() => this.setState({ callStatus: false })); // if error default to false
    }

    render() {
        return (
            <>Call Status:  {this.state.callStatus === true ? 'Active' : 'Inactive'}</>
        );
    }
}

export default CallStatus;