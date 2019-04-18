import React, { Component } from "react";
import host from "../../host.js";
import axios from 'axios';
import AccountUpdateForm from './AccountUpdateForm';


class AccountProfile extends Component {
    
    render() { 
        
        return ( 
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-4">
                        <h3 style={{ marginTop: "0px" }}>
                            Profile
                        </h3>
                    </div>

                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                <strong>{this.props.user.displayName}</strong>
                            </div>
                            <div className="pull-right color-elements" onClick={this.props.toggleChangeName}>
                                {this.props.updateUserName
                                    ? 'Cancel'
                                    : 'Change Name'
                                }
                            </div>
                        </div>
                    </div>

                    {this.props.updateUserName
                        ? <AccountUpdateForm
                            updateUser={this.props.handleUpdate}
                            toggleChangeName={this.props.toggleChangeName}
                        />
                        : null
                    }

                    <div className="col-md-8 fl-r">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                {this.props.user.email}
                            </div>
                            <div className="pull-right color-elements" onClick={this.props.toggleChangeImage}>

                                {this.props.updateUserImage
                                    ? 'Cancel'
                                    : 'Update Image'
                                }
                            </div>
                        </div>
                    </div>

                    {this.props.updateUserImage
                        ?
                        <div className="col-md-8 fl-r">
                            <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                <div className="pull-left">
                                    <div className="input-group update-pic">
                                        <input
                                            className="form-control"
                                            type="file"
                                            onChange={this.props.fileSelectedHandler}
                                        />
                                        <span className="input-group-btn">
                                            <button
                                                className="btn btn-default"
                                                type="button"
                                                onClick={(e) => this.props.fileUploadHandler(e)}
                                                disabled={this.props.selectedFile === ''}
                                            >
                                                Update Profile Image
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        : null
                    }
                </div>

            </div>
         );
    }
}
 
export default AccountProfile;