import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';
import AccountUpdateForm from './AccountUpdateForm';
import AccountProfile from './AccountProfile';

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
            updateUserImage: false,            
            updateBilling:false, 
            last4: 1234, 
            selectedFile: '',
            addToBalance:false,
            balance: 0,  
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
        const id = localStorage.getItem('userId');
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.selectedFile);
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

    getSumOfGroupTwilioCharges = async(groupId) => {
        try {
            const groupTwilioChargesRes = await axios.post(`${host}/api/billing/groupTwilioCharges`, groupId);        
            console.log("groupTwilioChargesRes: ", groupTwilioChargesRes);

            const sumOfGroupTwilioCharges = groupTwilioChargesRes.data.sumOfGroupTwilioCharges;
            console.log("sumOfGroupTwilioCharges: ", sumOfGroupTwilioCharges);

            return sumOfGroupTwilioCharges
        } catch(err) {
          console.log(err)
        }
    }

    getUserTwilioCharges = async() => {
        const id = this.state.user.id
        try {
            const userOwnedGroupsRes = await axios.get(`${host}/api/users/${id}/groupsOwned`);
            const userOwnedGroups = userOwnedGroupsRes.data
            console.log("userOwnedGroups: ", userOwnedGroups);

            const userOwnedGroupsIds = userOwnedGroups.map(group => {
                return group.groupId
            })
            console.log("userOwnedGroupsIds: ", userOwnedGroupsIds);


            let totalUserCharges = 0;

            for (let i = 0; i < userOwnedGroupsIds.length;i++) {
                totalUserCharges += await this.getSumOfGroupTwilioCharges(userOwnedGroupsIds[i]);
            }
            console.log("totalUserCharges: ", totalUserCharges);

        } catch(err) {
            console.log(err)
        }
    }

    
    getUserStripeCharges = async() => {
        const id = this.state.user.id
        try {
            const stripeId = 'cus_Et35QY0yTwAZuD'

            const stripeCharges = await axios.post(`${host}/api/billing/userStripeCharges`, {'stripeId': stripeId});
            console.log('stripeCharges: ', stripeCharges.data.allCustomerCharges)
        } catch(err) {
            console.log(err)
        }
    }







    render() {

        const { user, updateUserName, updateBilling, addToBalance, balance, last4, updateUserImage } = this.state

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

                            <AccountProfile 
                                user={user} 
                                updateUserName={updateUserName} 
                                toggleChangeName={this.toggleChangeName}
                                toggleChangeImage={this.toggleChangeImage}
                                handleUpdate={this.handleUpdate}
                                updateUserImage={updateUserImage}
                                fileSelectedHandler={this.fileSelectedHandler}
                                fileUploadHandler={this.fileUploadHandler}
                                selectedFile={this.state.selectedFile}
                            />
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
                                        <button onClick = {this.getUserTwilioCharges}>getUserTwilioCharges</button>
                                        <button onClick = {this.getUserStripeCharges}>getUserStripeCharges</button>   
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



