import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';
import AccountUpdateForm from './AccountUpdateForm';
import DeleteModal from '../Modal/DeleteModal';
import Footer from '../LandingPage/Footer';
import UpdateBillingWrapper from '../Billing/UpdateBillingWrapper.js';


class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updateUserName: false,
            updateUserImage: false,            
            updateBilling:false, 
            last4: 1234, 
            selectedFile: '',
            image: null
        }
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')
        const userEndpoint = `${host}/api/users/${id}`;

        axios.get(userEndpoint)
            .then(res => {
                this.setState({ user: res.data })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    user: {},
                });
            });

        axios.get(`${userEndpoint}/last4`)
            .then(res => {
                this.setState({ last4: res.data.last4 })
            })
            .catch(err => {
                console.log(err)
            });

    }

    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler = async (e) => {
        console.log('fileUploadHandler')
        const id = localStorage.getItem('userId');
        e.preventDefault();
        const userData = {
            avatar: URL.createObjectURL(this.state.selectedFile),
        }

        const formData = new FormData();
        formData.append('image', this.state.selectedFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.toggleChangeImage();
        try {
            const res = await axios.post(`${host}/api/upload`, formData)
            if(res.status === 200) {
                const userData = {
                    avatar: res.data.image
                }
                axios.put(`${host}/api/users/${id}`, userData)
                .then(res =>{
                    this.setState({ user: res.data})
                })
                .catch(err => {
                    console.log(err);
                })
            }    
        } catch (err) {
            console.log(err);
        };

    }

    
    
    toggleChangeImage = () => {
        this.setState(prevState => ({
            updateUserImage: !prevState.updateUserImage
        }));
    }

    toggleChangeName = () => {
        this.setState(prevState => ({
            updateUserName: !prevState.updateUserName
        }));
    }

    toggleChangeBilling = () => {
        this.setState(prevState => ({
            updateBilling: !prevState.updateBilling
        }));
    }

    handleUpdate = () => {
        const id = this.state.user.id
        axios
            .get(`${host}/api/users/${id}`)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err));
    }

    handleBillingUpdate = () => {
        const id = this.state.user.id
        axios
            .get(`${host}/api/users/${id}/last4`)
            .then(res => this.setState({last4:res.data.last4}))
            .catch(err => console.log(err))
    }

    handleDelete = () => {
        // First delete Groups Owned if any, then delete user
        const userId = localStorage.getItem('userId')
        axios
            .get(`${host}/api/users/${userId}/groupsOwned`)
            .then(res => {
                if (res.data.length === 0) { this.deleteAccount() }
                else {
                    const originalGroups = res.data.length;
                    let updatedGroups = 0;
                    res.data.forEach(group => {
                        axios
                            .delete(`${host}/api/groups/${group.groupId}`)
                            .then(() => {
                                updatedGroups++
                                if (updatedGroups === originalGroups) { this.deleteAccount() }
                            })
                            .catch(err => console.log(err));
                    })
                }
            })
            .catch(err => console.error(err));
    }

    deleteAccount = () => {
        const userId = localStorage.getItem('userId')
        axios
            .delete(`${host}/api/users/${userId}`)
            .then(() => this.props.auth.logout())
            .catch(err => console.log(err.response));
    }


    render() {
        console.log(this.state.user)
        const { user, updateUserName, updateBilling, last4, updateUserImage } = this.state

        return (
            <>
                <div className="container blog page-container">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10">
                            <div className='account-header'>
                                <img className='' style={{ width: '10%', borderRadius: '50%', height: '10%', marginRight: '15px' }} src={user.avatar || require('../../images/avatar1.png')} alt="user avatar" />                                
                                <h2>{user.displayName}'s Account </h2>
                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px"}}>
                                            Profile
                                        </h3>
                                    </div>
                                    
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">
                                                <strong>{user.displayName}</strong>
                                            </div>
                                            <div className="pull-right color-elements" onClick={this.toggleChangeName}>
                                            { updateUserName 
                                                ? 'Cancel'
                                                : 'Change Name'
                                            }
                                            </div>
                                        </div>
                                    </div>

                                    { updateUserName 
                                        ? <AccountUpdateForm 
                                            updateUser={this.handleUpdate}
                                            toggleChangeName={this.toggleChangeName}
                                        />
                                        : null
                                    }

                                    <div className="col-md-8 fl-r">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">
                                                {user.email}
                                            </div>
                                            <div className="pull-right color-elements" onClick={this.toggleChangeImage}>

                                                {updateUserImage
                                                    ? 'Cancel'
                                                    : 'Update Display Image'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                            {updateUserImage
                                                ?
                                                <div className="col-md-8 fl-r">
                                                    <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                                        <div className="pull-left">
                                                            <div className="input-group update-pic">
                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    onChange={this.fileSelectedHandler}
                                                                />
                                                                <span className="input-group-btn">
                                                                    <button
                                                                        className="btn btn-default"
                                                                        type="button"
                                                                        onClick={(e) => this.fileUploadHandler(e)}
                                                                        disabled={this.state.selectedFile === ''}
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
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px" }}>
                                            Plan Details
                                        </h3>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">
                                                {`${user.billingSubcription}`.toUpperCase()} Membership
                                            </div>
                                            <div className="pull-right">
                                                Upgrade
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">
                                                Pay as you chat
                                            </div>
                                            <div className="pull-right">
                                                Details
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px" }}>
                                            Billing
                                        </h3>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                        { updateBilling 
                                                ? <UpdateBillingWrapper 
                                                    handleBillingUpdate={this.handleBillingUpdate}
                                                    toggleChangeBilling={this.toggleChangeBilling}
                                                />
                                                : null
                                        }
                                        {updateBilling
                                                ? <CurrentBilling1
                                                    last4 = {last4}
                                                 /> 
                                                
                                                : <CurrentBilling2 
                                                    last4 = {last4}
                                                /> 
                                        }
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="pull-right color-elements" onClick={this.toggleChangeBilling}>
                                            { updateBilling 
                                                ? 'Cancel'
                                                : 'Update'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px" }}>
                                            Account
                                        </h3>
                                    </div>
                                
                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            {/* <div className="pull-left">
                                                Pay as you chat
                                            </div> */}
                                            <div className="pull-right">
                                                <DeleteModal
                                                    deleteMessage={"Confirm your email address."}
                                                    target={this.state.user.id}
                                                    targetName={this.state.user.email}
                                                    handleTarget={this.handleDelete}
                                                    type={'Delete Account'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>

                        </div>
                    </div>
                </div>

                <Footer/>
            </>
        );
    }
}

const CurrentBilling1 = (props) => {
    return(
        <div className="pull-left" style={{ display: "none"}} >
            {`•••• •••• •••• ${props.last4}`}
        </div>
    )
}

const CurrentBilling2 = (props) => {
    return(
        // <div className="pull-left">
        //     •••• •••• •••• 4242
        // </div>

        // <div className="pull-left" >
        //     •••• •••• •••• 4242
        // </div>

        <div className="pull-left" >
            {`•••• •••• •••• ${props.last4}`}
        </div>
    )
}

export default AccountSettings;



