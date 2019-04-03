import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Table } from 'reactstrap';
import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';


class GroupsOwned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: ''
        }
    }


    

    render() {
        return (<div className='mt-sm-3'>
            {/* {console.log(this.props.groupsOwned)} */}
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
                            <CallParticipants groupId={group.groupId}/>
                            <CallStatus groupId={group.groupId} />                            
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>);
    }
}

export default GroupsOwned;