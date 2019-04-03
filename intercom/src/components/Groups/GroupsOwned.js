import React, { Component } from 'react';

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';

require('../../styling/css/bootstrap.min.css');
require('../../styling/css/patros.css');

class GroupsOwned extends Component {

    render() {
        return (
            <>

                <div data-spy="scroll">

                    {/* <!-- Page Content --> */}
                    <section className="container blog">
                        <div className="row">
                            {/* <!-- Blog Column --> */}
                            <div className="col-md-8">
                                <h1 className="page-header sidebar-title">
                                    Groups Owned
                                </h1>

                                {this.props.groupsOwned.map( group => (
                                    <div className="row blogu" key={group.groupId}>
                                        <div className="col-sm-8 col-md-8">
                                            <h2 className="blog-title">
                                                {group.GroupName}
                                            </h2>
                                            <CallParticipants groupId={group.groupId} />
                                            <CallStatus groupId={group.groupId} />
                                        </div>
                                        <hr></hr>
                                    </div>
                                    
                                ))}
    

                            </div>
                        </div>
                    </section>
                </div>
            </>

        );
    }
}

export default GroupsOwned;