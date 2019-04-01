import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import host from "../../host.js";
import axios from 'axios';


class AccountUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            displayName: ''
        };
    }

    handleGroupInput = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    updateUser = async (e) => {
        const id = localStorage.getItem('userId');
        e.preventDefault();
        const userData = {
            displayName: this.state.displayName,
        }
        try {
            const res = await axios.put(`${host}/api/users/${id}`, userData)
            this.setState({ 
                displayName: res.data.displayName
            })
            this.toggle()
        } catch (err) {
            console.log(err);
        };

        this.props.updateUser();
    };

    render() {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Button color="info" onClick={this.toggle} className='float-sm-right mr-sm-3'>Update Account</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalHeader>Update Account</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Display Name</Label>
                                <Input 
                                    onChange={this.handleGroupInput} 
                                    type="text" 
                                    name="displayName" 
                                    id="displayName" 
                                    value={this.state.displayName} 
                                    placeholder="Enter new display name..."
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateUser}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AccountUpdateForm;