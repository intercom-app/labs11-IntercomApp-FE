import React from 'react';

const SearchBar = (props) => {
    return (
        <>
            <div className="input-group">
                <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    name="searchUser"
                    id="searchUser"
                    placeholder="Search for user..."
                    value={props.inputValue}
                    onChange={props.updateSearch}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        type="button"
                        onClick={props.clearSearch}
                    >
                        Done
                    </button>
                </span>
            </div>
        </>
    );
}

export default SearchBar;