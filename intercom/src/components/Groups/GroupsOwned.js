import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';

class GroupsOwned extends Component {

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title">
                    Groups Owned
                </h1>

                {this.props.groupsOwned.map(group => (
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
                                    Manage Members
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

export default GroupsOwned;