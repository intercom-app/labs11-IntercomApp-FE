import React, { Component } from "react";
import axios from 'axios';
import host from '../../host';
// import {Elements, StripeProvider} from 'react-stripe-elements';
import {CardElement, injectStripe} from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.


class AddToAccountBalanceNew extends Component {
    constructor(props) {
        console.log('Constructor Invoked'); //constructor first thing invoked in mounting lifecycle
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

    chargeCustomerAndAddToAccountBalance = async(e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        // console.log('userId: ', userId);
        try {
            const res = await axios.get(`${host}/api/users/${userId}`);
            const userStripeId = res.data.stripeId;
            // console.log('userStripeId: ', userStripeId);

            const customerStripeInfo = await axios.post(`${host}/api/purchasingAndBilling/retrieveCustomerDefaultSource`,{'userStripeId':userStripeId});
            // console.log('customerStripeInfo: ', customerStripeInfo);
            const defaultSourceId = customerStripeInfo.data.defaultSourceId;
            // console.log('defaultSourceId: ', defaultSourceId);

            // TESTING - Soon to be phased out (but working) credit card charging method
            const chargeResponse = await axios.post(`${host}/api/purchasingAndBilling/createCharge`, {
                'userStripeId':userStripeId,
                'sourceId': defaultSourceId,
                'amountToAdd': this.state.amountToAdd 
            })
            // console.log('chargeResponse: ', chargeResponse);

            if (chargeResponse.data.charge.status === "succeeded") {
                // console.log('charge suceeded!');

                const accountBalanceCall = await axios.get(`${host}/api/users/${userId}/accountBalance`);
                let accountBalance = accountBalanceCall.data.accountBalance;
                // console.log('accountBalance old: ', accountBalance);
                accountBalance = accountBalance + chargeResponse.data.charge.amount;
                // console.log('accountBalance new: ', accountBalance);

                const addToBalanceResponse = await axios.put(`${host}/api/users/${userId}/accountBalance`, {accountBalance:accountBalance});
                // console.log('addToBalanceResponse: ', addToBalanceResponse);
            }

        } catch(err) {
            console.log('err: ', err);
        }
    }


    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        return (
                <div style = {{border:'1px solid blue'}}>
                    <div>
                        <h1>Add to Account Balance</h1>
                        <div>
                            [Icon representing saved Payment Method]
                        </div>
                        <form onSubmit = {this.addToAccountBalance}>
                            <div>
                                Amount to add to account balance: 
                                <input
                                    type = 'number'
                                    name = 'amountToAdd'
                                    value = {this.state.amountToAdd}
                                    onChange = {this.inputChangeHandler}
                                />
                                <button onClick = {this.chargeCustomerAndAddToAccountBalance} type = 'submit'> chargeCustomerAndAddToAccountBalance </button>
                            </div>                            
                        </form>
                    </div>
                </div>
        )
    }
}


// The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
export default injectStripe(AddToAccountBalanceNew);

