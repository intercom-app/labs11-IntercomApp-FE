import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';
import App from "../../App";
import PricingPlan1 from './PricingPlan1';
import PricingPlan2 from './PricingPlan2';

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
            <StripeProvider apiKey = {process.env.PK_TEST}  >
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

                </div>
            </StripeProvider>
        )
    }
}

export default PricingPurchasingOptions;