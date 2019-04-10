import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';

class GroupsOwned extends Component {
    state = {
        display: true,
    }

    toggleDisplay = () => {
        this.setState(prevState => ({
            display: !prevState.display
        }))
    }

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title groups-title">
                    Groups Owned
                    <span data-toggle="collapse" data-target="#groups-owned" >
                    { this.state.display 
                    ?   <i
                            className="fa fa-angle-up pull-right" 
                            style={{fontSize: "1.2em"}}
                            onClick={this.toggleDisplay}
                        >
                        </i>
                    :   <i 
                            className="fa fa-angle-down pull-right" 
                            style={{fontSize: "1.2em"}}
                            onClick={this.toggleDisplay}
                        >
                        </i>
                    }
                    </span>
                </h1>

                <div className="collapse in" id="groups-owned">
                { this.props.groupsOwned.length === 0
                ? <p className="no-groups">You do not own any groups at this time.</p>
                : <>
                    {this.props.groupsOwned.map(group => (
                        <div key={group.groupId} className="groups-row">
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
                            <hr style={{marginBottom:"0px"}}></hr>
                        </div>
                    ))}
                </>
                }
                </div>

            </>

        );
    }
}

export default GroupsOwned;