import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import host from "../../host.js";
import axios from 'axios';


class AccountUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            user: {
                nickName: '',
                billingSubcription: ''
            }
        };

    }

    componentDidMount() {
        this.setState({
            user: {
                nickName: this.props.user.displayName,
                billingSubcription: this.props.user.billingSubcription
            }
        })
    }

    handleGroupInput = e => {
        e.preventDefault();
        this.setState({
            user: {
                ...this.state.user,                
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

    updateUser = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId')
        const userData = {
            displayName: this.state.user.nickName,
            billingSubcription: this.state.user.billingSubcription
        }
        console.log(userData)
        console.log(`${host}/api/users/${userId}`)
        
        try {
               const res = await axios.put(`${host}/api/users/${this.state.user.id}`, userData)
               console.log(res.data)     
               .then(updatedUser => {
                        console.log(updatedUser)
                        
                    })
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
        // setTimeout(
        //     () => {
        //         window.location.reload();
        //     }, 1000
        // );
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
                                <Label>Nickname</Label>
                                <Input onChange={this.handleGroupInput} type="text" name="nickName" value={this.state.user.nickName || ''} id="nickname" placeholder={this.props.user.displayName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Billing Type</Label>
                                <Input onChange={this.handleGroupInput} type="select" name="billingSubcription" value={this.state.user.billingSubcription || ''} id="billingSubcription" placeholder="Billing Type">
                                    <option>free</option>                                    
                                    <option>premium</option>
                                </Input>                                            
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