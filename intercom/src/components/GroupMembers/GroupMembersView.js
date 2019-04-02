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
            users: [],
            search: ''
        };
    }

    handleInput = e => {
        this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            }
        )
    }

    handleSearch = async (e) => {  
        let users;      
        await axios
            .get(`${host}/api/users`)
            .then(res => users = res.data)
            .catch(err => console.log(err));

        if (users) { 
            const options = {
                shouldSort: true,
                findAllMatches: true,
                threshold: 0.3,
                location: 0,
                distance: 128,
                maxPatternLength: 128,
                minMatchCharLength: 3,
                keys: [
                    "displayName",
                    "email"
                ]
            };
            const fuse = new Fuse(users, options);
            const results = fuse.search(e.target.value);

            this.setState({
                users: results,
                search: e.target.value
            });
        }
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
                <SearchBar 
                    input={this.state.search}
                    updateSearch={this.handleSearch}
                />
                <SearchResults 
                    users={ this.state.users }
                />
                {/* <Form>
                    <FormGroup>
                        <Input onChange={this.handleInput} type="text" name="inviteeId" value={this.state.inviteeId} id="inviteeId" placeholder="Invitee Id" />
                    </FormGroup>
                    <Button color="primary" onClick={this.inviteUser}>Invite</Button>{' '}                    
                </Form> */}
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