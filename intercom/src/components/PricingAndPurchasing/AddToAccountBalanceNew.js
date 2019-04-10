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
            currentAccountBalance: 0,
            amountToAddToAccountBalance:''
        };
    }

    inputChangeHandler = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    addToAccountBalanceSubmitHandler = (e) => {
        // user clicks button to add money to his or her account balance
        e.preventDefault();
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
                                    name = 'amountToAddToAccountBalance'
                                    value = {this.state.amountToAddToAccountBalance}
                                    onChange = {this.inputChangeHandler}
                                />
                                <button onClick = {this.addToAccountBalance} type = 'submit'> SubmitPaymentAndAddToAccountBalance </button>
                            </div>                            
                        </form>
                    </div>
                </div>
        )
    }
}


// The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
export default injectStripe(AddToAccountBalanceNew);

