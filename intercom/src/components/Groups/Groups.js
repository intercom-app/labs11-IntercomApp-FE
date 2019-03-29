import React, { Component } from "react";
import axios from "axios";
import host from "../../host.js";
import { NavLink } from "react-router-dom";
import { Table } from 'reactstrap';


class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups`)
            .then(res => {
                this.setState({ groups: res.data });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                
                {console.log(this.state.groups)}
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Group Name</th>
                            <th>Group Phone #</th>
                            <th>Call Status</th>
                            <th>Time Stamp</th>                        
                        </tr>
                    </thead>
                    {this.state.groups.map((group, key) => (
                        <tbody key={key}>
                            <tr>
                                <NavLink to={`/group/${group.id}`} >
                                <td>{group.id}</td></NavLink>
                                <td>{group.name}</td>
                                <td>{group.phoneNumber}</td>
                                <td>{group.callStatus}</td>
                                <td>{group.createdAt}</td>       
                            </tr>
                        </tbody>
                ))}
                </Table>
                
                
            </div>
        );
    }
}

export default Groups;
