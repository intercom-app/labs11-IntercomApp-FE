import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';


class GroupsBelonged extends Component {
    state = {
        display: false,
    }

    toggleDisplay = () => {
        this.setState(prevState => ({
            display: !prevState.display
        }))
    }

    render() {
        return (
            <>
                <h1 className="page-header sidebar-title">
                    Groups Belonged To
                    <span data-toggle="collapse" data-target="#groups-belonged" >
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

                <div className="collapse" id="groups-belonged">
                { this.props.groupsBelonged.length === 0
                ? <p>You are not a member of any groups at this time.</p>
                : <>
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
                }
                </div>
            </>

        );
    }
}

export default GroupsBelonged;