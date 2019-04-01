import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import host from "../../host.js";
import axios from 'axios';


class GroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            user: {
                nickName: this.props.user.displayName,
                billingSubcription: this.props.billingSubcription
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

    createGroup = async (event) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Created group.' }
        event.preventDefault();
        const groupData = {
            name: this.state.group.name
        }

        try {
            const group = await axios.post(`${host}/api/groups`, groupData)
            if (group) {
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
        } catch (err) {
            console.log(err);
        };


        this.toggle()
        // this.setState({
        //     group: {
        //         name: '',
        //         phoneNumber: ''
        //     }
        // });
        // this.setState({ state: this.state });
        // history.replace(`/user/${userId.userId}`)
        setTimeout(
            () => {
                window.location.reload();
            }, 1000
        );
    };

    render() {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        console.log(this.props.user)
        return (
            <div>
                <Button color="info" onClick={this.toggle} className='float-sm-right mr-sm-3'>Update Account</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalHeader>Update Account</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Nickname</Label>
                                <Input onChange={this.handleGroupInput} type="text" name="nickname" value={this.props.user.displayName} id="nickname" placeholder="Nickname" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Billing Type</Label>
                                <Input onChange={this.handleGroupInput} type="select" name="billingSubcription" value={this.props.user.billingSubcription} id="billingSubcription" placeholder="Billing Type">
                                    <option>{this.props.user.billingSubcription}</option>                                    
                                    <option>premium</option>
                                </Input>                                            
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createGroup}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default GroupForm;