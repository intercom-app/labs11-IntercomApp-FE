import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import host from "../../host.js";
import axios from 'axios';
import history from '../../history';



class GroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            group: {
                name: ''
            }
        };

    }

    handleGroupInput = e => {
        this.setState({
            group: {
                ...this.state.group,
                [e.target.name]: e.target.value
            }
        }
        )
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    createGroup =  async (event) => {
        event.preventDefault();
        const userId = {userId: localStorage.getItem('userId')}
        const activity = { userId: localStorage.getItem('userId'), activity: 'Created group.' }
        event.preventDefault();
        const groupData = {
            name: this.state.group.name
        }
        try{
           const group = await axios.post(`${host}/api/groups`, groupData)
            if(group){
               await this.setState({ group: group.data })
            axios
                .post(`${host}/api/groups/${this.state.group.id}/groupOwners`, userId)
                .then(groupOwner => {
                    console.log(groupOwner)
                })
                .catch(err => {
                    console.log(err);
                });
            axios
                .post(`${host}/api/groups/${this.state.group.id}/groupMembers`, userId)
                .then(groupMember => {
                    console.log(groupMember)
                })
                .catch(err => {
                    console.log(err);
                });
            axios
                .post(`${host}/api/groups/${this.state.group.id}/activities`, activity)
                .then(activity => {
                    console.log(activity)
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }catch(err) {
                console.log(err);
            };

       


        // this.setState({
        //     group: {
        //         name: '',
        //         phoneNumber: ''
        //     }
        // });
        history.replace(`/users/${userId.userId}`)
    };

    render() {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Create a new group</Button>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalHeader>Create New Group</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input onChange={this.handleGroupInput} type="text" name="name" value={this.state.group.name} id="name" placeholder="Group Name" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createGroup}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default GroupForm;