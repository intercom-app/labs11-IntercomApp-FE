import React, { Component } from 'react';
import axios from "axios";
import host from "../../host.js";
// import { Link } from "react-router-dom";
import { Table } from 'reactstrap';

class SingleGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            group: []
        }
    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups/${this.state.id}`)
            // .get(`http://localhost:3300/api/group/${this.state.id}`)

            .then(res => {
                console.log(res)
                this.setState({ group: res.data })
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <div>
                {console.log(this.state.group)}

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


                        <tbody>
                            <tr>
                                <td>{this.state.group.id}</td>
                                <td>{this.state.group.name}</td>
                                <td>{this.state.group.phoneNumber}</td>
                                <td>{this.state.group.callStatus}</td>
                                <td>{this.state.group.createdAt}</td>
                            </tr>

                        </tbody>
                </Table>
            </div>
        );
    }
}

export default SingleGroup;