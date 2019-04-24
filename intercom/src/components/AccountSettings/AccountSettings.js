import React, { Component } from 'react';
import axios from 'axios';
import host from "../../host.js";

import UnAuth from '../UnAuth/UnAuth';
import AccountProfile from './AccountProfile';
import Account from './Account';
import AccountPlanDetails from './AccountPlanDetails';
import AccountBilling from './AccountBilling';
import Footer from '../LandingPage/Footer';


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
            accountBalance: 0,  
            unAuth: false
        }
    }

    componentDidMount() {
        const id = localStorage.getItem('userId')
        this.checkIfUnAuth(id)
        this.getUser(id);

        const userEndpoint = `${host}/api/users/${id}`;
        axios.get(`${userEndpoint}/last4`)
            .then(res => {
                this.setState({ last4: res.data.last4 })
            })
            .catch(err => {
                console.log(err)
            });
        axios.get(`${userEndpoint}/accountBalance`)
            .then(res => {
                this.setState({ accountBalance: res.data.accountBalance})
            })
            .catch(err => {
                console.log(err)
            });

    }

    checkIfUnAuth = (id) => {
        const userId = parseInt(id);
        const paramsId = parseInt(this.props.match.params.id)
        if (userId !== paramsId) {
            this.setState({ unAuth: true })
        }
    }

    getUser = (id) => {
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
        
        axios.get(`${userEndpoint}/accountBalance`)
            .then(res => {
                this.setState({ accountBalance: res.data.accountBalance })
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
                    this.setState({ user: res.data, selectedFile: ''})
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
        axios
            .get(`${host}/api/users/${id}/accountBalance`)
            .then(res => this.setState({accountBalance:res.data.accountBalance}))
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

    // getSumOfGroupTwilioCharges = async(groupId) => {
    //     try {
    //         // console.log("groupId: ", groupId);
    //         const groupTwilioChargesRes = await axios.post(`${host}/api/billing/groupTwilioCharges`, {'groupId':groupId});        
    //         // console.log("groupTwilioChargesRes: ", groupTwilioChargesRes);

    //         const sumOfGroupTwilioCharges = groupTwilioChargesRes.data.sumOfGroupTwilioCharges;
    //         // console.log("sumOfGroupTwilioCharges: ", sumOfGroupTwilioCharges);

    //         return sumOfGroupTwilioCharges
    //     } catch(err) {
    //       console.log(err)
    //     }
    // }

    // getSumOfUserTwilioCharges = async() => {
    //     const id = this.state.user.id
    //     try {
    //         const userOwnedGroupsRes = await axios.get(`${host}/api/users/${id}/groupsOwned`);
    //         const userOwnedGroups = userOwnedGroupsRes.data
    //         // console.log("userOwnedGroups: ", userOwnedGroups);

    //         const userOwnedGroupsIds = userOwnedGroups.map(group => {
    //             return group.groupId
    //         })
    //         // console.log("userOwnedGroupsIds: ", userOwnedGroupsIds);

    //         let sumOfUserTwilioCharges = 0;

    //         for (let i = 0; i < userOwnedGroupsIds.length;i++) {
    //             sumOfUserTwilioCharges += await this.getSumOfGroupTwilioCharges(userOwnedGroupsIds[i]);
    //         }
    //         // console.log("sumOfUserTwilioCharges (exact): ", sumOfUserTwilioCharges);
    //         sumOfUserTwilioCharges = Math.round(sumOfUserTwilioCharges*100)/100;
    //         // console.log("sumOfUserTwilioCharges (rounded): ", sumOfUserTwilioCharges);
    //         return sumOfUserTwilioCharges

    //     } catch(err) {
    //         console.log(err)
    //     }
    // }
    
    // getSumOfUserStripeCharges = async() => {
    //     const id = this.state.user.id
    //     try {
    //         const userRes= await axios.get(`${host}/api/users/${id}`);
    //         // const user = userRes.data;
    //         const userStripeId = userRes.data.stripeId;
    //         // console.log('stripeId: ', stripeId);

    //         const userStripeChargesRes = await axios.post(`${host}/api/billing/userStripeCharges`, {'userStripeId': userStripeId});
    //         // console.log('userStripeChargesRes: ' , userStripeChargesRes);
    //         let sumOfUserStripeCharges = userStripeChargesRes.data.sumOfUserStripeCharges; // in dollars
    //         // console.log('sumOfUserStripeCharges [dollars]: ', sumOfUserStripeCharges); //in dollars
    //         return sumOfUserStripeCharges

    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // getAllTwilioCharges = async() => {
    //     try {
    //         const allTwilioChargesRes = await axios.get(`${host}/api/billing/allTwilioCharges`);
    //         let allTwilioCharges = allTwilioChargesRes.data.allTwilioCharges;
    //         console.log('allTwilioCharges: ', allTwilioChargesRes);
    //     } catch(err) {
    //         console.log('err: ', err)
    //     }
    // }

    // updateUserAccountBalance = async() => {
    //     const id = this.state.user.id
    //     try{
    //         const sumOfUserStripeCharges = await this.getSumOfUserStripeCharges();
    //         // console.log('sumOfUserStripeCharges [dollars]: ', sumOfUserStripeCharges);

    //         const sumOfUserTwilioCharges = await this.getSumOfUserTwilioCharges();
    //         // console.log('sumOfUserTwilioCharges: ', sumOfUserTwilioCharges);

    //         const updatedAccountBalance = sumOfUserTwilioCharges + sumOfUserStripeCharges;
    //         // console.log('updatedAccountBalance: ', updatedAccountBalance);

    //         await axios.put(`${host}/api/users/${id}/accountBalance`,{accountBalance:updatedAccountBalance});
    //         this.setState({'accountBalance':updatedAccountBalance});
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    render() {

        const { unAuth, user, updateUserName, updateBilling, addToBalance, accountBalance, last4, updateUserImage } = this.state

        return (
            <>
                { unAuth ? <UnAuth/> : 
                <>
                <div className="container blog page-container">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10">
                            <div className="row">
                                <div className="col-md-12"> 
                                    <div className="page-icon-flex">
                                        <img className="avatar-img-users" src={user.avatar || require('../../images/avatar1.png')} alt="user avatar" />  
                                        <h2>Account</h2>
                                    </div>
                                </div>
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
                            <AccountPlanDetails user={user}/>
                            <hr></hr>
                            <AccountBilling 
                                accountBalance={accountBalance}
                                addToBalance={addToBalance}
                                updateBilling={updateBilling}
                                last4={last4}
                                toggleChangeAddToBalance={this.toggleChangeAddToBalance}
                                toggleChangeBilling={this.toggleChangeBilling}
                                handleAddToBalance={this.handleAddToBalance}
                                handleBillingUpdate={this.handleBillingUpdate}
                                // updateUserAccountBalance={this.updateUserAccountBalance}
                                // getSumOfUserTwilioCharges={this.getSumOfUserTwilioCharges}
                                // getSumOfUserStripeCharges={this.getSumOfUserStripeCharges}
                                // getAllTwilioCharges= {this.getAllTwilioCharges}
                            />
                            
                            <hr></hr>
                            <Account user={user} handleTarget={this.handleDelete}/>
                            <hr></hr>
                        </div>
                    </div>
                </div>

                <Footer/>
                </>}
            </>
        );
    }
}

export default AccountSettings;



