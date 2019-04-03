import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const SearchBar = (props) => {
    return (
        <Form>
            <FormGroup>
                <Label for="searchUser">Invite new members</Label>
                <Input
                    type="text"
                    name="searchUser"
                    id="searchUser"
                    placeholder="Search for user..."
                    value={props.inputValue}
                    onChange={props.updateSearch}
                />
            </FormGroup>
        </Form>

    );
}

export default SearchBar;