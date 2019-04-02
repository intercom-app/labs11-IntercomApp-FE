import React, { Component } from 'react';
import host from "../../host.js";
import axios from "axios";
import { Table, Container, Row, Form, FormGroup, Input, Button } from 'reactstrap';



class GroupMembersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,            
            members: [],
            invitees: [],
            inviteeId: '',
            error: null
        };
    }

    handleInput = e => {
        this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            }
        )
    }

    inviteUser = async (e) => {
        e.preventDefault();
        const inviteeId = { userId: this.state.inviteeId }        
        console.log(this.state.id)
        try {
        await axios.post(`${host}/api/groups/${this.state.id}/groupInvitees`, inviteeId)
            .then(res => {
                console.log(res)
                this.setState({invitees: res.data})
            })
            .catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        };

    }

    isOwner = (id) => {
        return parseInt(localStorage.getItem('userId')) === id
    }

    componentDidMount() {
        const id = this.props.match.params.id;
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


    removeUser = (e, id, userDisplayName) => {
        e.preventDefault();
        const ownerId = localStorage.getItem('userId')
        const activity = { userId: ownerId, activity: `Removed ${userDisplayName} from the group` }
        axios
            .delete(`${host}/api/groups/${this.state.id}/groupMembers/${id}`)
            .then(res => {
                this.setState({ members: res.data});
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(activity => {
                console.log(activity)
            })
            .catch(err => {
                console.log(err);
            }); 
    }

    removeInvitee = (e, id, userDisplayName) => {
        e.preventDefault();
        const ownerId = localStorage.getItem('userId')
        const activity = { userId: ownerId, activity: `Cancelled ${userDisplayName}'s invitation.` }
        axios
            .delete(`${host}/api/groups/${this.state.id}/groupInvitees/${id}`)
            .then(res => {
                this.setState({ invitees: res.data });
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        axios
            .post(`${host}/api/groups/${this.state.id}/activities`, activity)
            .then(activity => {
                console.log(activity)
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Input onChange={this.handleInput} type="text" name="inviteeId" value={this.state.inviteeId} id="inviteeId" placeholder="Invitee Id" />
                    </FormGroup>
                    <Button color="primary" onClick={this.inviteUser}>Invite</Button>{' '}                    
                </Form>
                <Row>
                    <h3>Group Members</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Group Id</th>
                                <th>Member Name</th>
                            </tr>
                        </thead>
                        {this.state.members.map((member, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{member.groupId}</td>
                                    <td>{member.displayName} {!this.isOwner(member.userId) ? 
                                        <Button color='danger' onClick={(e) => this.removeUser(e, member.userId, member.displayName)}>Remove user</Button> 
                                        : null}
                                    </td>
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
                                <th>Group Id</th>
                                <th>Invitee Name</th>
                            </tr>
                        </thead>
                        {this.state.invitees.map((invitee, key) => (
                            <tbody key={key}>
                                <tr>
                                    <td>{invitee.groupId}</td>
                                    <td>{invitee.displayName}
                                        <Button color='danger' onClick={(e) => this.removeInvitee(e, invitee.userId, invitee.displayName)}>Remove user</Button>

                                    </td>
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