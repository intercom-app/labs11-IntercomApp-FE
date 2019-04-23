import React, { Component } from "react";
import AccountUpdateForm from './AccountUpdateForm';


class AccountProfile extends Component {

    componentDidMount() {
        window.$('[data-toggle="tooltipEmail"]').tooltip();
    }

    componentDidUpdate() {
        window.$('[data-toggle="tooltipEmail"]').tooltip();
    }
    
    render() { 
        
        return ( 
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-4" style={{ marginBottom: "40px" }}>
                        <h3 style={{ marginTop: "0px" }}>
                            Profile
                        </h3>
                    </div>

                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                <strong>{this.props.user.displayName}</strong>
                            </div>
                            <div className="pull-right color-elements update-link" onClick={this.props.toggleChangeName}>
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

                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                {this.props.user.email}
                            </div>
                            <div className="pull-right info-link">
                                <div
                                    data-toggle="tooltipEmail"
                                    data-placement="left"
                                    data-html="true"
                                    title="Email address cannot be updated for verficiation and authentication purposes."
                                >
                                    <i className="fa fa-question-circle"></i>
                                    {' '}Email
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                {' '}
                            </div>
                            <div className="pull-right color-elements update-link" onClick={this.props.toggleChangeImage}>
                                {this.props.updateUserImage
                                    ? 'Cancel'
                                    : 'Update Profile Image'
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
                                                Update Image
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