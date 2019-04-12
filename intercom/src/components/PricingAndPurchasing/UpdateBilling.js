import React, { Component } from "react";
import axios from 'axios';
import host from '../../host';
import {CardElement, injectStripe} from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.


class UpdateBilling extends Component {
    constructor(props) {
        super(props);
    }

    createSource = async() => {
        const sourceInfo = {
            type: 'card',
            currency: 'usd',
            usage: 'reusable'
        }
        
        try{
            const createSourceResponse = await this.props.stripe.createSource(sourceInfo);
            // console.log('createSourceResponse: ', createSourceResponse);
            const source = createSourceResponse.source;
            // console.log('sourceObject: ', source);
            return source;
        } catch(err) {
            // console.log('err: ', err);
            return err
        }
    }

    updateDefaultSource = async(source) => {
        const userId = localStorage.getItem('userId');
        // console.log('userId: ', userId);

        try{
            const res = await axios.get(`${host}/api/users/${userId}`);
            const userStripeId = res.data.stripeId;
            // console.log('userStripeId: ', userStripeId);

            const newlyUpdatedSource = await axios.post(`${host}/api/purchasingAndBilling/updateDefaultSource`, {
                'userStripeId':userStripeId,
                'sourceId': source.id
            });
            // console.log('newlyUpdatedSource: ', newlyUpdatedSource);
            return newlyUpdatedSource;
        } catch(err) {
            // console.log('err: ', err);
            return err
        }
    }

    updateBilling = async() => {
        try{
            // Step 1, create a source from the entered credit card information. 
            const source = await this.createSource();
            // console.log('source: ', source);
            // Step 2, update the customer's default source. 
            const newDefaultSource = await this.updateDefaultSource(source);
            // console.log('newDefaultSource: ', newDefaultSource);
        } catch(err) {
            // console.log('err: ', err)
            return err
        }
    }

    render() {
        return (
                <div style = {{border:'1px solid red'}}>
                    <div>
                        <h1>updateBilling</h1>
                        <CardElement />
                        <button onClick = {this.updateBilling}>updateBilling</button>
                    </div>
                </div>
        )
    }
}

export default injectStripe(updateBilling);

