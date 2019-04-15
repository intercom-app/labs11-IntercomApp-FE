import React, { Component } from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import AddToBalance from './AddToBalance';

class AddToBalanceWrapper extends Component {
    render() { 
        return (
            // StripeProvider initializes Stripe and passes in your publishable key. It’s equivalent to creating a Stripe instance with Stripe.js.
            <StripeProvider apiKey = {process.env.REACT_APP_PK_TEST} betas = {["payment_intent_beta_3"]}>
                {/* <div style = {{border:'1px solid black'}}> */}
                <div>
                    <Elements>
                        <AddToBalance />
                    </Elements>

                </div>               
            </StripeProvider>
        )
    }
}

export default AddToBalanceWrapper;