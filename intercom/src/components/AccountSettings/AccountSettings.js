import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';
import AccountUpdateForm from './AccountUpdateForm';
import DeleteModal from '../Modal/DeleteModal';
import Footer from '../LandingPage/Footer';
import UpdateBillingWrapper from '../Billing/UpdateBillingWrapper.js';
import AddToBalanceWrapper from '../Billing/AddToBalanceWrapper.js';

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updateUserName: false,
            updateBilling:false,
            addToBalance:false,
            balance: 0,  
            last4: 1234
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

    toggleChangeAddToBalance = () => {
        this.setState(prevState => ({
            addToBalance: !prevState.addToBalance
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

    handleAddToBalance = () => {
        const id = this.state.user.id
        // axios
        //     .get(`${host}/api/users/${id}/last4`)
        //     .then(res => this.setState({last4:res.data.last4}))
        //     .catch(err => console.log(err))
    }

    handleDelete = (id) => {
        this.deleteAccount(id); // First updates activities for all groups user belonged to
        // Second updates activities for all groups user was invited to
        // Third deletes all groups user was owner of
        // Last deletes user and logs out
    }

    /* addGroupsMemberActivities = (id) => {
        const activity = { userId: id, activity: 'Left group. User left Voice Chatroom.' }
        axios
            .get(`${host}/api/users/${id}/groupsBelongedTo`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                if (groupsIds.length === 0) { this.addGroupsInviteeActivities(id) }
                else {
                    groupsIds.forEach(groupId => {
                        axios
                            .post(`${host}/api/groups/${groupId}/activities`, activity)
                            .then(() => this.addGroupsInviteeActivities(id))
                            .catch(err => console.log(err));
                    })
                }
            })
            .catch(err => console.error(err));
    }

    addGroupsInviteeActivities = (id) => {
        const activity = { userId: id, activity: 'Declined invite. User left Voice Chatroom.' }
        axios
            .get(`${host}/api/users/${id}/groupsInvitedTo`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                if (groupsIds.length === 0) { this.deleteGroupsOwnerOf(id) }
                else {
                    groupsIds.forEach(groupId => {
                        axios
                            .post(`${host}/api/groups/${groupId}/activities`, activity)
                            .then(() => this.deleteGroupsOwnerOf(id))
                            .catch(err => console.log(err));
                    })
                }
            })
            .catch(err => console.error(err));
    }

    deleteGroupsOwnerOf = (id) => {
        axios
            .get(`${host}/api/users/${id}/groupsOwned`)
            .then(res => {
                const groupsIds = res.data.map(group => group.groupId);
                if (groupsIds.length === 0) { this.deleteAccount(id) }
                else {
                    groupsIds.forEach(groupId => {
                        axios
                            .delete(`${host}/api/groups/${groupId}`)
                            .then(() => this.deleteAccount(id))
                            .catch(err => console.log(err));
                    })
                }
            })
            .catch(err => console.error(err));
    } */

    deleteAccount = (id) => {
        axios
            .delete(`${host}/api/users/${id}`)
            .then(() => this.props.auth.logout())
            .catch(err => console.log(err.response));
}

    render() {

        const { user, updateUserName, updateBilling,  addToBalance, balance, last4 } = this.state

        return (
            <>
                <div className="container blog page-container">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10">
                            <h2>Account</h2>
                            <hr></hr>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4">
                                        <h3 style={{ marginTop: "0px"}}>
                                            Profile
                                        </h3>
                                        <DeleteModal deleteMessage={"Confirm your email address below to delete your account"} target={this.state.user.id} targetName={this.state.user.email} handleTarget={this.handleDelete} type={'Delete Account'} />
                                         {/* <button
                                            style={{ padding: "3px 12px"}}
                                            className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom"
                                            type="button"
                                            onClick={() => this.handleDelete(user.id)}
                                        >
                                            Delete Account
                                        </button>  */}
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

                                    <div className="col-md-8">
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-left">
                                                {user.email}
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

                                        {/* { addToBalance
                                            ? <CurrentBalance2
                                                balance = {balance}
                                            /> 
                                            
                                            : <CurrentBalance2 
                                                balance = {balance}
                                            /> 
                                        } */}

                                        <div>
                                            Account Balance: {this.state.balance}
                                        </div>
                                             
                                        {/* ADD TO BALANCE */}
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            { addToBalance 
                                                    ? <AddToBalanceWrapper 
                                                        handleAddToBalance={this.handleAddToBalance}
                                                        toggleChangeAddToBalance={this.toggleChangeAddToBalance}
                                                    />
                                                    : null
                                            }
                                            
                                        </div>
                                            
                                        

                                        {/* UPDATING PAYMENT INFO */}
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
                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-right color-elements" onClick={this.toggleChangeAddToBalance}>
                                                { addToBalance 
                                                    ? 'Cancel'
                                                    : 'Add Money'
                                                }
                                            </div>
                                        </div>

                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                            <div className="pull-right color-elements" onClick={this.toggleChangeBilling}>
                                                { updateBilling 
                                                    ? 'Cancel'
                                                    : 'Update'
                                                }
                                            </div>
                                        </ div>

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
        <div className="pull-left" >
            {`•••• •••• •••• ${props.last4}`}
        </div>
    )
}

// const CurrentBalance1 = (props) => {
//     return(
//         <div className="pull-left" style={{ display: "none"}} >
//             Account Balance: ${props.balance}
//         </div>
//     )
// }

// const CurrentBalance2 = (props) => {
//     return(
//         <div className="pull-left" >
//             Account Balance: ${props.balance}
//         </div>
//     )
// }

export default AccountSettings;



