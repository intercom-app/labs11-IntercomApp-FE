import React, { Component } from 'react';
// import { NavLink } from "react-router-dom";
// import { Table } from 'reactstrap';
// import CallParticipants from './CallParticipants';
// import CallStatus from './CallStatus';

require('../../styling/css/bootstrap.min.css');
require('../../styling/css/patros.css');

class GroupsOwned extends Component {

    render() {
        return (
            <>
                {/*
                    <div className='mt-sm-3'>
                        <h2>Groups Owned</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Group Name</th>
                                    <th>Participants</th>
                                    <th>Call Status</th>
                                </tr>
                            </thead>
                            {this.props.groupsOwned.map((group, key) => (
                                <tbody key={key}>
                                    <tr>
                                        <td><NavLink to={`/group/${group.groupId}`} >{group.groupId}</NavLink></td>
                                        <td>{group.GroupName} </td>
                                        <CallParticipants groupId={group.groupId} />
                                        <CallStatus groupId={group.groupId} />
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </div>
                */}

                <div data-spy="scroll">

                    {/* <!-- Page Content --> */}
                    <section className="container blog">
                        <div className="row">
                            {/* <!-- Blog Column --> */}
                            <div className="col-md-8">
                                <h1 className="page-header sidebar-title">
                                    Company Blog
                            </h1>
                                {/* <!-- First Blog Post --> */}
                                <div className="row blogu">
                                    <div className="col-sm-8 col-md-8">
                                        <h2 className="blog-title">
                                            Post title 1
                                    </h2>
                                        <p><i className="fa fa-calendar-o"></i>  August 28, 2013
                                        <span className="comments-padding"></span>
                                            <i className="fa fa-comment"></i> 0 comments
                                    </p>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </section>
                </div>
            </>

        );
    }
}

export default GroupsOwned;