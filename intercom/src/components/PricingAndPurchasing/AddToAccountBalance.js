import React, { Component } from "react";
import axios from 'axios';
import host from '../../host';
// import {Elements, StripeProvider} from 'react-stripe-elements';
import {CardElement, injectStripe} from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.



class AddToAccountBalance extends Component {
    constructor(props) {
        console.log('Constructor Invoked'); //constructor first thing invoked in mounting lifecycle
        super(props);
        this.state = {
            currentAccountBalance: 0,
            amountToAddToAccountBalance:'',
            creditCardUsage: 'single_use',
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


    // Step 1, create a source from the entered credit card information. //Source objects allow you to accept a variety of payment methods. They represent a customer's payment instrument, and can be used with the Stripe API just like a Card object: once chargeable, they can be charged, or can be attached to customers.

    // Certain payment methods allow for the creation of sources that can be reused for additional payments
    // without your customer needing to complete the payment process again. Sources that can be reused have 
    // their usage parameter set to reusable.
    
    // While sources can be charged directly, reusable sources should always be attached to a Customer object for later reuse.

    // Conversely, if a source can only be used once, this parameter is set to single_use, and a source must
    // be created each time a customer makes a payment. Such sources should not be attached to customers—instead, 
    // they should be charged directly. They can be charged only once, and their status will change to consumed 
    // when charged.

    createSourceAndAttachToCustomer = async() => {
        const sourceData = {
            type: 'card',
            currency: 'usd',
            owner: {
                'email': 'customerEmail@emailDomain.com',
            },
            usage: this.state.creditCardUsage
        }
        console.log('sourceData: ', sourceData)
        
        const userId = localStorage.getItem('userId')
        console.log(userId)

        //TESTING (For the charging step included below)
        const amountToAddToAccountBalance = this.state.amountToAddToAccountBalance;
        // console.log('amountToAddToAccountBalance: ', amountToAddToAccountBalance)

        
        try{
            const createSourceResponse = await this.props.stripe.createSource(sourceData);
            console.log('createSourceResponse: ', createSourceResponse);
            const source = createSourceResponse.source;
            console.log('sourceObject: ', source);

            const userData = await axios.get(`${host}/api/users/${userId}`)
            const user = userData.data;
            const userStripeId =user.stripeId;
            console.log('userStripeId: ', userStripeId);

            // Step 2. Attach the source to the customer object. (see the endpoint on the backend)
            const newlyAttachedSource = await axios.post(`${host}/api/purchasingAndBilling/attachSourceToCustomer`, {
                'userStripeId':userStripeId,
                'sourceId': source.id
            })
            console.log('newlyAttachedSource: ',newlyAttachedSource)

            // //TESTING 1  PaymentIntentMethodOfCharging
            // const paymentIntentClientSecret = await axios.post(`${host}/api/purchasingAndBilling/createPaymentIntent`, {'amountToAddToAccountBalance':amountToAddToAccountBalance});
            // console.log('paymentIntentClientSecret: ', paymentIntentClientSecret.data.client_secret);
            
            // const handleCardPaymentResponse = await this.props.stripe.handleCardPayment(paymentIntentClientSecret.data.client_secret);

            // // TESTING 2 - Soon to be phased out (but working) credit card charging method
            const chargeResponse = await axios.post(`${host}/api/purchasingAndBilling/createCharge`, {
                'userStripeId':userStripeId,
                'sourceId': source.id,
                'amountToAddToAccountBalance': amountToAddToAccountBalance
            })
            console.log('chargeResponse: ',chargeResponse)
            
        } catch(err) {
            console.log('err: ', err);
        }
    }

    
    // attachSourceToCustomer = async() => {
    //     const userId = localStorage.getItem('userId')
    //     console.log(userId)
    // }


    // If the checkout process is interrupted and resumes later, you should attempt to reuse the same PaymentIntent instead of creating a new one. 
    // Each PaymentIntent has a unique ID that you can use to retrieve it if you need it again. In your application’s data model, you can store 
    // the PaymentIntent’s ID on the customer’s shopping cart or session in order to facilitate retrieval. The benefit of reusing the PaymentIntent
    // is that the object helps track any failed payment attempts for a given cart or session.
    
    // You should also provide an idempotency key–typically based on the ID that you associate with the cart or customer session in your application–when creating the PaymentIntent to avoid erroneously creating duplicate PaymentIntents for the same purchase.

    // The client secret can be used to complete the payment process with the amount specified on the PaymentIntent. It should not be logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
    // After obtaining the client secret from the data attribute, use stripe.handleCardPayment (client secret required as parameter to use this function) to complete the payment
    createPaymentIntentSubmitHandler = async() => {
        // e.preventDefault();
        const amountToAddToAccountBalance = this.state.amountToAddToAccountBalance;
        console.log('amountToAddToAccountBalance: ', amountToAddToAccountBalance)

        try{
            const paymentIntentClientSecret = await axios.post(`${host}/api/purchasingAndBilling/createPaymentIntent`, {'amountToAddToAccountBalance':amountToAddToAccountBalance});
            console.log('paymentIntentClientSecret: ', paymentIntentClientSecret.data.client_secret);
            
            const handleCardPaymentResponse = await this.props.stripe.handleCardPayment(paymentIntentClientSecret.data.client_secret, {
            });
            console.log('handleCardPaymentResponse: ', handleCardPaymentResponse);
        } catch(err){
            console.log(err.response)
        }
    };

    handleOptionChange = changeEvent => {
        this.setState({
            creditCardUsage: changeEvent.target.value
        });
    };


    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        return (
                <div>
                    <div>
                        <h1>Add to Account Balance</h1>
                        <form onSubmit = {this.addToAccountBalance}>
                            <div>
                                Amount to add to account balance: 
                                <input
                                    type = 'number'
                                    name = 'amountToAddToAccountBalance'
                                    value = {this.state.amountToAddToAccountBalance}
                                    onChange = {this.inputChangeHandler}
                                />
                                {/* <button onClick = {this.addToAccountBalance} type = 'submit'> ADD TO BALANCE </button> */}
                            </div>
                        </form>
                    </div>

                    <div>
                        {/*NOTE: Loading Stripe.js asynchronously can speed up your initial page load, especially if you don't show the payment form until the user interacts with your application in some way. (see:https://github.com/stripe/react-stripe-elements#then-load-stripejs-in-your-application)*/}
                        <h2>Select Payment Method</h2>
                        <br />
                        <div>
                            <h3>Option 1: Manually Enter CC information</h3>
                            {/*Here we can present user with the option of saving their entered card information */}
                            <CardElement />
                            <br/>
                            
                            <form>
                                <div>
                                    <label>
                                    <input 
                                        type = 'radio'
                                        name = 'saveCreditCardInformationOption'
                                        value = 'single_use'
                                        checked = {this.state.creditCardUsage === 'single_use'}
                                        onChange = {this.handleOptionChange}
                                    />
                                    No, I would NOT like to save this credit card for later
                                    </label>
                                </div>

                                <div>
                                    <label>
                                    <input 
                                        type = 'radio'
                                        name = 'saveCreditCardInformationOption'
                                        value = 'reusable'
                                        checked = {this.state.creditCardUsage === 'reusable'}
                                        onChange = {this.handleOptionChange}
                                    />
                                    Yes, I would like to save this credit card  for later. 
                                    </label>
                                </div>
                            </form>

                            <br/>
                            <div>
                                <h5>I want to save this credit card for later. </h5>
                                {/* <button onClick = {this.createPaymentIntentSubmitHandler}>create payment intent</button> */}
                                <button onClick = {this.createSourceAndAttachToCustomer}>create source function</button>
                            </div>
                            <br/>
                            
                        </div>
                        <br />
                        <div> 
                            <h2>Saved Payment Methods</h2>
                            <br />
                            <h3>saved payment method 1</h3>
                            <h3>saved payment method 2</h3>
                        </div>
                    </div>
                </div>
        )
    }
}


// The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
export default injectStripe(AddToAccountBalance);