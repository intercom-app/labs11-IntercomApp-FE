import React, { Component } from "react";
import axios from 'axios';
import host from '../../host';
// import {CardElement, injectStripe} from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
import {injectStripe} from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.

// The CardElement component imported from react-stripe-elements creates a “card” type element
// that mounts on the page when the component renders. The CardElement includes inputs for all
// of the major card fields: the card number, the expiration date, and the CVC. To display 
// those inputs separately, you can use other Element components provided by the library.

class AddToBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountToAdd:''
        };
    }

    inputChangeHandler = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    chargeAndAddToBalance = async(e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        // console.log('userId: ', userId);
        try {
            const res = await axios.get(`${host}/api/users/${userId}`);
            const userStripeId = res.data.stripeId;
            // console.log('userStripeId: ', userStripeId);

            const customerStripeInfo = await axios.post(`${host}/api/billing/retrieveCustomerDefaultSource`,{'userStripeId':userStripeId});
            // console.log('customerStripeInfo: ', customerStripeInfo);
            const defaultSourceId = customerStripeInfo.data.defaultSourceId;
            // console.log('defaultSourceId: ', defaultSourceId);

            // TESTING - Soon to be phased out (but working) credit card charging method
            const chargeResponse = await axios.post(`${host}/api/billing/createCharge`, {
                'userStripeId':userStripeId,
                'sourceId': defaultSourceId,
                'amountToAdd': this.state.amountToAdd 
            })
            // console.log('chargeResponse: ', chargeResponse);

            if (chargeResponse.data.charge.status === "succeeded") {
                // console.log('charge suceeded!');

                // // // // ORIGINAL APPROACH
                // const accountBalanceCall = await axios.get(`${host}/api/users/${userId}/accountBalance`);
                // let accountBalance = accountBalanceCall.data.accountBalance;
                // // console.log('accountBalance old: ', accountBalance);
                // accountBalance = accountBalance + chargeResponse.data.charge.amount;
                // // console.log('accountBalance new: ', accountBalance);

                // // const addToBalanceResponse = await axios.put(`${host}/api/users/${userId}/accountBalance`, {accountBalance:accountBalance});
                // await axios.put(`${host}/api/users/${userId}/accountBalance`, {accountBalance:accountBalance});
                // // console.log('addToBalanceResponse: ', addToBalanceResponse);
                
                this.props.updateUserAccountBalance()
            }

        } catch(err) {
            // console.log('err: ', err);
            return err
        }
    }


    render() {
        return (
                // <div style = {{border:'1px solid blue', marginBottom:'100px'}}>
                <div>
                    <div>
                        <form onSubmit = {this.chargeAndAddToBalance}>
                            <div style = {{border:'1px solid blue', marginBottom:'100px'}} className="form-group">
                                Amount to add: 
                                <select className="form-control">
                                    <option onClick = {e => this.setState({amountToAdd:200})}>200</option>
                                    <option>5</option>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>25</option>
                                    <option>30</option>
                                    <option>35</option>
                                    <option>40</option>
                                </select>
                                <input
                                    type = 'number'
                                    name = 'amountToAdd'
                                    value = {this.state.amountToAdd}
                                    onChange = {this.inputChangeHandler}
                                />
                                <button onClick = {this.chargeAndAddToBalance} type = 'submit'> chargeAndAddToBalance </button>
                            </div>                            
                        </form>
                    </div>

                </div>
        )
    }
}


// The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
export default injectStripe(AddToBalance);
























// chargeCustomer = async(e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem('userId');
//     // console.log('userId: ', userId);

//     try {
//         const res = await axios.get(`${host}/api/users/${userId}`);
//         const userStripeId = res.data.stripeId;
//         // console.log('userStripeId: ', userStripeId);
//         const customerStripeInfo = await axios.post(`${host}/api/billing/retrieveCustomerDefaultSource`,{'userStripeId':userStripeId});
//         // console.log('customerStripeInfo: ', customerStripeInfo);
//         const defaultSourceId = customerStripeInfo.data.defaultSourceId;
//         // console.log('defaultSourceId: ', defaultSourceId);

//         // TESTING - Soon to be phased out (but working) credit card charging method
//         const chargeResponse = await axios.post(`${host}/api/billing/createCharge`, {
//             'userStripeId':userStripeId,
//             'sourceId': defaultSourceId,
//             'amountToAdd': this.state.amountToAdd 
//         })
//         console.log('chargeResponse: ', chargeResponse);

//         if (chargeResponse.data.charge.status === "succeeded") {
//             // console.log('charge suceeded!');
//             return chargeResponse.data.charge.amount //returns charge amount
//         }

//     } catch(err) {
//         // console.log('err: ', err);
//         return err
//     }
// }

// addToBalance = async(userId, amountToAdd) => {
//     try {
//         const accountBalanceCall = await axios.get(`${host}/api/users/${userId}/accountBalance`);
//         let accountBalance = accountBalanceCall.data.accountBalance;
//         // console.log('accountBalance old: ', accountBalance);
//         accountBalance = accountBalance + chargeResponse.data.charge.amount;
//         // console.log('accountBalance new: ', accountBalance);

//         // const addToBalanceResponse = await axios.put(`${host}/api/users/${userId}/accountBalance`, {accountBalance:accountBalance});
//         await axios.put(`${host}/api/users/${userId}/accountBalance`, {accountBalance:accountBalance});
//         // console.log('addToBalanceResponse: ', addToBalanceResponse);
        

//     } catch(err) {
//         // console.log('err: ', err);
//         return err
//     }
// }