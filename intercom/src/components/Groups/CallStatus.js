import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class CallStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callStatus: false,
        }
    }

    componentDidMount() {
        // Get Call Status every 3 seconds in case call happens while on page
        this.interval = setInterval(() => this.getCallStatus(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getCallStatus = () => {
        const callStatus = `${host}/api/groups/${this.props.groupId}/callStatus`;
        axios.get(callStatus)
            .then(res => {
                this.setState({ callStatus: res.data.callStatus })
            })
            .catch(() => this.setState({ callStatus: false })); // if error default to false
    }

    render() {
        return (
            <>Call Status:  {this.state.callStatus === true ? 'Active' : 'Inactive'}</>
        );
    }
}

export default CallStatus;