import React, { Component } from 'react';
import host from "../../host.js";
import axios from "axios";
import { Table, Container, Row } from 'reactstrap';



class GroupMembersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,            
            members: [],
            invitees: []
        };
    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups/${this.state.id}/groupMembers`)
            .then(res => {
                this.setState({ members: res.data });
            })
            .catch(err => {
                console.error(err);
            });

        axios
            .get(`${host}/api/groups/${this.state.id}/groupInvitees`)
            .then(res => {
                this.setState({ invitees: res.data });
            })
            .catch(err => {
                console.error(err);
            });
        
    }
    render() {
        return (
            <Container>
                <Row>
                    <h3>Group Members</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Member Name</th>
                            </tr>
                        </thead>
                        {this.state.members.map((member, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{member.groupId}</td>
                                    <td>{member.displayName}</td>
                                </tr>
                            </tbody>
                            
                        ))}
                    </Table>
                </Row>
                <Row>
                    <h3>Group Invitees</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Invitee Name</th>
                            </tr>
                        </thead>
                        {this.state.invitees.map((invitee, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{invitee.groupId}</td>
                                    <td>{invitee.displayName}</td>
                                </tr>
                            </tbody>

                        ))}
                    </Table>
                </Row>
            </Container>
        )
    }
}

export default GroupMembersView;