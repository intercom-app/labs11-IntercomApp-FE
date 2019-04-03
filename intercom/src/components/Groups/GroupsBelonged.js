import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';


class GroupsBelonged extends Component {

    render() {
        return (
            <>
                <div data-spy="scroll">
                    <section className="container blog">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="page-header sidebar-title">
                                    Groups Belonged To
                                </h1>

                                {this.props.groupsBelonged.map( group => (
                                    <Link to={`/group/${group.groupId}`} key={group.groupId}>
                                    <div className="row blogu">
                                        <div className="col-sm-8 col-md-8">
                                            <h2 className="blog-title">
                                                {group.GroupName}
                                            </h2>
                                            <p>
                                                <span className="comments-padding"></span>
                                                <CallStatus groupId={group.groupId} />
                                                <span className="comments-padding"></span>
                                                <CallParticipants groupId={group.groupId} />
                                            </p>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    </Link>
                                    
                                ))}
    

                            </div>
                        </div>
                    </section>
                </div>
            </>

        );
    }
}
 
export default GroupsBelonged;