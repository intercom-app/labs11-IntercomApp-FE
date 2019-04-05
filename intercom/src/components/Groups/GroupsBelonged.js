import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';


class GroupsBelonged extends Component {

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title">
                    Groups Belonged To
                </h1>

                {this.props.groupsBelonged.map(group => (
                    <div key={group.groupId}>
                        <div className="row blogu" >
                            <div className="col-sm-8 col-md-8">
                                <Link to={`/group/${group.groupId}`} >
                                    <h3 className="blog-title">
                                        {group.GroupName}
                                    </h3>
                                </Link>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <CallStatus groupId={group.groupId} />
                                <span className="comments-padding"></span>
                                <CallParticipants groupId={group.groupId} />
                                <Link to={`/group/${group.groupId}/members`} className='pull-right'>
                                    View Members
                                </Link>
                            </div >

                        </div>
                        <hr></hr>
                    </div>

                ))}

            </>

        );
    }
}

export default GroupsBelonged;