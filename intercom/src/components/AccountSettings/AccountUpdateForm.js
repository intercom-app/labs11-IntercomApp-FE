import React, { Component } from "react";
import host from "../../host.js";
import axios from 'axios';


class AccountUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: ''
        };
    }

    handleNameInput = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
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
            this.props.toggleChangeName();
        } catch (err) {
            console.log(err);
        };

        this.props.updateUser();
    };

    render() {
        return (
            <>
                <div className="col-md-8">
                    <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                        <div className="pull-left">
                            <div className="input-group searchbar">
                                <input
                                    autoComplete="off"
                                    className="form-control searchbar form-control-sm"
                                    type="text"
                                    name="displayName"
                                    placeholder=" New display name..."
                                    maxLength="20"
                                    onChange={this.handleNameInput}
                                    value={this.state.displayName}
                                />
                                <span className="input-group-btn">
                                    <button 
                                        className="btn btn-default" 
                                        type="button"
                                        onClick={this.updateUser}
                                        disabled={this.state.displayName === ""}
                                    >
                                        Update
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AccountUpdateForm;