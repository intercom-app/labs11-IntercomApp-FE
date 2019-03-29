import React, { Component } from 'react';
import { Link } from "react-router-dom";
import GroupForm from '../Groups/GroupForm';
import { NavLink } from "react-router-dom";
import { Table } from 'reactstrap';


class GroupsBelonged extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            {/* {console.log(this.props.groupsBelonged)} */}
            <h2>Groups Belonged To</h2>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Group Name</th>
                    </tr>
                </thead>
                {this.props.groupsBelonged.map((group, key) => (
                    <tbody key={key}>
                        <tr>
                            <NavLink to={`/groups/${group.groupId}`} >
                                <td>{group.groupId}</td></NavLink>
                            <td>{group.GroupName}</td>

                        </tr>
                    </tbody>
                ))}
            </Table>
        </div> );
    }
}
 
export default GroupsBelonged;