import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from '../Groups/GroupForm';
// import { NavLink } from "react-router-dom";
import GroupsBelonged from '../Groups/GroupsBelonged';
import GroupsInvited from '../Groups/GroupsInvited';
import host from '../../host';
import { Row, Card, CardBody, CardTitle, Container} from 'reactstrap';


class User extends Component {
    state = {
        user: {},
        groupsBelongedTo: [],
        groupsInvitedTo: [], 
        groupsOwned: []
        
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')
        const userEndpoint = `${host}/api/users/${id}`;

        axios.get(userEndpoint)
            .then(res => {
                // console.log(res.data)
                this.setState({ user: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    user: {},
                });
            });
            this.getGroupsInvitedTo(id);
            this.getgroupsBelongedTo(id);
            this.getgroupsOwned(id);
    }


    getGroupsInvitedTo = (id) => {
        const groupsInvitedTo = `${host}/api/users/${id}/groupsInvitedTo`;

        axios.get(groupsInvitedTo)
            .then(res => {
                this.setState({ groupsInvitedTo: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsInvitedTo: []
                });
            });
    }

    getgroupsBelongedTo = (id) => {
        const groupsBelongedTo = `${host}/api/users/${id}/groupsBelongedTo`;
        
        axios.get(groupsBelongedTo)
            .then(res => {
                this.setState({ groupsBelongedTo: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsBelongedTo: []
                });
            });
    }

    getgroupsOwned = (id) => {
        const groupsOwned = `${host}/api/users/${id}/groupsOwned`;

        axios.get(groupsOwned)
            .then(res => {
                this.setState({ groupsOwned: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    groupsOwned: []
                });
            });
    }




    updateGroups = () => {
        const id = localStorage.getItem('userId')        
        this.getGroupsInvitedTo(id);
        this.getgroupsBelongedTo(id);
    }
    

    render() {
        // console.log('belongs',this.state.groupsBelongedTo)
        console.log('owned', this.state.groupsOwned)
            // console.log(this.props.groupQuantity)
        
        return (
            <Container>
                {this.state.error
                    ? <p>Error retrieving user!</p>
                    : <div>
                        <Row className='mt-sm-4 ml-sm-2'>
                            <Card>
                                <CardBody>
                                    <CardTitle><strong>Id: </strong>{this.state.user.id}</CardTitle>
                                    <CardTitle><strong>Nickname: </strong>{this.state.user.displayName}</CardTitle>
                                    <CardTitle><strong>Email: </strong>{this.state.user.email}</CardTitle> 
                                    <CardTitle><strong>Billing Type: </strong>{this.state.user.billingSubcription}</CardTitle>                                                                                                           
                                </CardBody>
                            </Card>
                        </Row>
                        {/* <NavLink to={`/user/${localStorage.getItem('userId')}/account`}>Account Settings</NavLink> */}
                        <GroupForm  groupQuantity={this.state.groupsOwned.length} /> 
                        <GroupsBelonged groupsBelonged={this.state.groupsBelongedTo}/>
                        <GroupsInvited groupsInvited={this.state.groupsInvitedTo} updateGroups={this.updateGroups}/>                                         
                    </div>
                }
            </Container>
        );
    }
}

export default User;