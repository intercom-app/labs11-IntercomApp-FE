import React from 'react';

const SearchBar = (props) => {
    return (
        <>
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
        </>
    );
}

export default SearchBar;