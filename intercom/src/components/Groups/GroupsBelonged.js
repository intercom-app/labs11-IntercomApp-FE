import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';


class GroupsBelonged extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupsBelonged: [],
        }
    }

    componentDidMount() {
        this.setState({ groupsBelonged: this.props.groupsBelonged });
    }

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title">
                    Groups Belonged To
                </h1>

                {this.state.groupsBelonged.map(group => (
                    <div key={group.groupId}>
                        <div className="row blogu" >
                            <div className="col-sm-8 col-md-8">
                                <Link to={`/group/${group.groupId}`} >
                                    <h3 className="blog-title">
                                        {group.GroupName}
                                    </h3>
                                </Link>
                                <>
                                    <CallStatus groupId={group.groupId} />
                                    <span className="comments-padding"></span>
                                    <CallParticipants groupId={group.groupId} />
                                </>
                            </div>
                        </div>
                        <hr></hr>
                    </div>

                ))}

            </>

        );
    }
}

export default GroupsBelonged;