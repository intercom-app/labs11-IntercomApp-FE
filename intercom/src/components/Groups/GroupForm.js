import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class GroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

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
                                <Input type="text" name="group name" id="group name" placeholder="Group Name" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="callStatus" id="callStatus" placeholder="Call Status" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default GroupForm;