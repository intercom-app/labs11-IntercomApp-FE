import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Table } from 'reactstrap';


class GroupsInvited extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            {/* {console.log(this.props.groupsInvited)} */}
            <h2>Groups Invited To</h2>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Group Name</th>
                    </tr>
                </thead>
                {this.props.groupsInvited.map((group, key) => (
                    <tbody key={key}>
                        <tr>
                            <NavLink to={`/group/${group.groupId}`} >
                                <td>{group.groupId}</td></NavLink>
                            <td>{group.GroupName}</td>

                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>);
    }
}

export default GroupsInvited;