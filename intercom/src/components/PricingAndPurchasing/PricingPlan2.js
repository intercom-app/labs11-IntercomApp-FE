import React, { Component } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import host from "../../host.js";

// The CardElement component imported from react-stripe-elements creates a “card” type element
// that mounts on the page when the component renders. The CardElement includes inputs for all
// of the major card fields: the card number, the expiration date, and the CVC. To display 
// those inputs separately, you can use other Element components provided by the library.


// PricingPlan2 class defines a component that displays a CardElement and a button for completing the purchase.
class PricingPlan2 extends Component {
    constructor(props) {
        super(props);
        this.submitPaymentHandler = this.submitPaymentHandler.bind(this);
    }

    async submitPaymentHandler(ev) {
        // User clicked Submit Payment

        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log(token);
        console.log(token.id);

        let response = await fetch(`${host}/api/purchasingAndBilling/charge2`, {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: token.id
        });

        if (response.ok) console.log("Purchase Complete!");
        if (response.ok) this.setState({complete:true});
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return (
            <div style = {{border:'1px solid red'}}>
                <h2>PricingPlan2 Card</h2>
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick = {this.submitPaymentHandler}>Submit Payment</button>
            </div>
        )
    }
}

export default injectStripe(PricingPlan2);