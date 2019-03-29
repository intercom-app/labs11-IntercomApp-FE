import React, { Component } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';

// The CardElement component imported from react-stripe-elements creates a “card” type element
// that mounts on the page when the component renders. The CardElement includes inputs for all
// of the major card fields: the card number, the expiration date, and the CVC. To display 
// those inputs separately, you can use other Element components provided by the library.


class PricingPlan2 extends Component {
    constructor(props) {
        super(props);
        this.submitPaymentHandler = this.submitPaymentHandler.bind(this);
    }

    async submitPaymentHandler(ev) {
        // User clicked Submit Payment

    }

    render() {
        return (
            <div style = {{border:'1px solid red'}}>
                <h2>PricingPlan2 Card</h2>
                <CardElement />
                <button onClick = {this.submitPaymentHandler}>Submit Payment</button>
            </div>
        )
    }
}

export default injectStripe(PricingPlan2);