import React from 'react';
// import { Form, FormGroup, Label, Input } from 'reactstrap';

const SearchBar = (props) => {
    return (
        <>
            <aside className="col-md-4 sidebar-padding">
                <div className="blog-sidebar">
                    <h3 className="sidebar-title">Invite New Members</h3>
                    <hr></hr>
                    <h4 className="sidebar-title">Search Users: </h4>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            name="searchUser"
                            id="searchUser"
                            placeholder="Search for user..."
                            value={props.inputValue}
                            onChange={props.updateSearch}
                        />
                    </div>
                </div>
            </aside>
            {/* <Form>
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
        </Form> */}
        </>
    );
}

export default SearchBar;