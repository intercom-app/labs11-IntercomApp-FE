import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

const SearchBar = (props) => {
    return (
        <Form>
            <FormGroup>
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