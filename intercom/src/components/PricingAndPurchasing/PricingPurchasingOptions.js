import React, { Component } from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import PricingPlan1 from './PricingPlan1';
import PricingPlan2 from './PricingPlan2';
import AddToAccountBalance from "./AddToAccountBalance";
import UpdatePaymentMethod from './UpdatePaymentMethod';

class PricingPurchasingOptions extends Component {
    constructor() {
        super();
        this.state = {stateKey1: 'stateKey1_value'};
    }

    pricingPurchasingFunction1 = () => {
        console.log('pricingPurchasingOptionsFunction1');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() { 
        return (
            // StripeProvider initializes Stripe and passes in your publishable key. It’s 
            // equivalent to creating a Stripe instance with Stripe.js.
            <StripeProvider apiKey = 'pk_test_VuIo3fiUe3QUD93ieQbeDT5U00sms1K5SK' betas = {["payment_intent_beta_3"]}>
                <div>
                    <h1>Pricing Purchasing Options</h1>

                   
                    {/* The Elements component, which encloses the PRICING PLAN 1 checkout form,
                      creates an Elements group. When you use multiple Elements components
                      instead of the combined CardElement, the Elements group indicates 
                      which ones are related. For example, if you used separate components
                      for the card number, expiration date, and CVC, you would put them 
                      all in the same Elements group. Note that Elements must contain the
                      component that you wrapped with injectStripe, you cannot put Elements
                      inside of the component that you wrap with injectStripe. */}
                    <Elements>
                        {/* PRICING PLAN 1 COMPONENT */}
                        <PricingPlan1 />
                    </Elements>

                    
                    <Elements>
                        {/* PRICING PLAN 2 COMPONENT */}
                        <PricingPlan2 />
                    </Elements>

                    <Elements>
                        {/* ADD TO ACCOUNT BALANCE COMPONENT */}
                        <AddToAccountBalance />
                    </Elements>

                    <Elements>
                        <UpdatePaymentMethod />
                    </Elements>

                </div>
                
            </StripeProvider>
        )
    }
}

export default PricingPurchasingOptions;
