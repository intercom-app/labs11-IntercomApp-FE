import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class GroupChatroomCall extends Component {
    state = { 
        callStatus: false,
        callParticipants: []
    }

    interval = 0

    componentDidMount() {
        // Get Call Status every second in case call happens while on page
        this.interval = setInterval(() => this.getCallInfo(), 1000);

        window.$('[data-toggle="tooltip"]').tooltip();
    }

    componentDidUpdate() {
        window.$('[data-toggle="tooltip"]').tooltip();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getCallInfo = () => {
        axios.get(`${host}/api/groups/${this.props.groupId}/callStatus`)
            .then(res => this.setState({ callStatus: res.data.callStatus }))
            .catch(() => this.setState({ callStatus: false })); // if error default to false

        axios.get(`${host}/api/groups/${this.props.groupId}/callParticipants`)
            .then(res => this.setState({ callParticipants: res.data }))
            .catch(() => this.setState({ callParticipants: [] })); // if error default to none
    }

    render() {

        return (
            <>
                <h2 className="page-header sidebar-title">
                    Call Status
                </h2>

                <div className="row blogu" >
                    <div className="col-sm-12 col-md-12">

                        <span className='pull-right info-link'>
                            <div
                                data-toggle="tooltip"
                                data-placement="left"
                                data-html="true"
                                title="Open the mobile application and select the group you wish to start or join a Voice Chat with. Within the group simply click <b>Start Call</b> or <b>Join Call</b> !"
                            >
                                <i className="fa fa-question-circle"></i>
                                {this.state.callStatus === true ? <>{' '}Join a Call</> : <>{' '}Start a Call</>}
                            </div>
                        </span>

                        <h3 className="blog-title color-elements">
                            {this.state.callStatus === true ? 'Active' : 'Inactive'}
                        </h3>

                    </div>

                    {this.state.callStatus === true
                        ?
                        <div className="col-sm-12 col-md-12">

                            <div style={{ marginTop: "8px" }}>
                                <strong>Call Participants:</strong>
                                <span className="comments-padding"></span>
                                {this.state.callParticipants.length}
                            </div>

                            <p className="p-list">
                                {this.state.callParticipants.map(user =>
                                    <span key={user.userId}>
                                        {user.displayName}{' | '}
                                    </span>
                                )}
                            </p>
                        </div >
                        : null
                    }

                </div>
                <hr></hr>
            </>

        )
    }

}


export default GroupChatroomCall;