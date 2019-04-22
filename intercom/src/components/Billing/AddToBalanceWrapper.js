import React, { Component } from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import AddToBalance from './AddToBalance';

class AddToBalanceWrapper extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }
    render() { 
        return (
            // StripeProvider initializes Stripe and passes in your publishable key. It’s equivalent to creating a Stripe instance with Stripe.js.
            <StripeProvider apiKey = {process.env.REACT_APP_PK_TEST} betas = {["payment_intent_beta_3"]}>
                {/* <div style = {{border:'1px solid black'}}> */}
                <div>
                    <Elements>
                        <AddToBalance 
                            // updateUserAccountBalance = {this.props.updateUserAccountBalance}
                            toggleChangeAddToBalance = {this.props.toggleChangeAddToBalance}
                            handleAddToBalance= {this.props.handleAddToBalance}
                        />
                    </Elements>
                </div>               
            </StripeProvider>
        )
    }
}

export default AddToBalanceWrapper;