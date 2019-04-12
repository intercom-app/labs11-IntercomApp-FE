import React, { Component } from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import AddToBalance from './AddToBalance';

class AddToBalanceWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            // StripeProvider initializes Stripe and passes in your publishable key. It’s equivalent to creating a Stripe instance with Stripe.js.
            <StripeProvider apiKey = 'pk_test_VuIo3fiUe3QUD93ieQbeDT5U00sms1K5SK' betas = {["payment_intent_beta_3"]}>
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