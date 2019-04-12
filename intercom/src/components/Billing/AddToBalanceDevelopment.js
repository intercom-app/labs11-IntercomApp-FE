//// // // NOTE: This component was initially used to implement several different Stripe-enabled
//// // // functionalities. These functionalities can be inferred from this component's methods. 
//// // // One thing here that would do us good to use later is the use of Stripe's PaymentIntent
//// // // method of charging customers. 


// import React, { Component } from "react";
// import axios from 'axios';
// import host from '../../host';
// // import {Elements, StripeProvider} from 'react-stripe-elements';
// import {CardElement, injectStripe} from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.


// class AddToAccountBalance extends Component {
//     constructor(props) {
//         console.log('Constructor Invoked'); //constructor first thing invoked in mounting lifecycle
//         super(props);
//         this.state = {
//             currentAccountBalance: 0,
//             amountToAddToAccountBalance:'',
//             creditCardUsage: 'single_use',
//         };
//     }

//     inputChangeHandler = e => {
//         e.preventDefault();
//         const {name, value} = e.target;
//         this.setState({[name]: value});
//     }

//     addToAccountBalanceSubmitHandler = (e) => {
//         // user clicks button to add money to his or her account balance
//         e.preventDefault();

//     }


//     // Step 1, create a source from the entered credit card information. //Source objects allow you to accept a variety of payment methods. They represent a customer's payment instrument, and can be used with the Stripe API just like a Card object: once chargeable, they can be charged, or can be attached to customers.

//     // Certain payment methods allow for the creation of sources that can be reused for additional payments
//     // without your customer needing to complete the payment process again. Sources that can be reused have 
//     // their usage parameter set to reusable.
    
//     // While sources can be charged directly, reusable sources should always be attached to a Customer object for later reuse.

//     // Conversely, if a source can only be used once, this parameter is set to single_use, and a source must
//     // be created each time a customer makes a payment. Such sources should not be attached to customers—instead, 
//     // they should be charged directly. They can be charged only once, and their status will change to consumed 
//     // when charged.

//     createSource = async() => {
//         const sourceInfo = {
//             type: 'card',
//             currency: 'usd',
//             usage: this.state.creditCardUsage
//         }
//         console.log('sourceInfo: ', sourceInfo)
        
//         try{
//             const createSourceResponse = await this.props.stripe.createSource(sourceInfo);
//             console.log('createSourceResponse: ', createSourceResponse);
//             const source = createSourceResponse.source;
//             console.log('sourceObject: ', source);
//             return source
//         } catch(err) {
//             console.log(err)
//         }
//     }

//     // Saving an additional credit card ("attaching" in Stripe) to a customer (for having multiple credit cards saved for a customer)
//     attachSourceToCustomer = async(source) => {
//         const userId = localStorage.getItem('userId')
//         console.log('userId: ', userId)

//         try{
//             const res = await axios.get(`${host}/api/users/${userId}`);
//             const userStripeId = res.data.stripeId;
//             console.log('userStripeId: ', userStripeId);

//             // Step 2. Attach the source to the customer object. (see the endpoint on the backend)
//             const newlyAttachedSource = await axios.post(`${host}/api/purchasingAndBilling/attachSourceToCustomer`, {
//                 'userStripeId':userStripeId,
//                 'sourceId': source.id
//             });
//             console.log('newlyAttachedSource: ', newlyAttachedSource);
//             return newlyAttachedSource
//         } catch(err) {
//             console.log('err: ', err);
//         }
//     }

//     // Replacing a customer's saved default credit card ("updating" the credit card Stripe)
//     updateDefaultSource = async(source) => {
//         const userId = localStorage.getItem('userId')
//         console.log('userId: ', userId)

//         try{
//             const res = await axios.get(`${host}/api/users/${userId}`);
//             const userStripeId = res.data.stripeId;
//             console.log('userStripeId: ', userStripeId);

//             // Step 2. Attach the source to the customer object. (see the endpoint on the backend)
//             const newlyUpdatedSource = await axios.post(`${host}/api/purchasingAndBilling/updateDefaultSource`, {
//                 'userStripeId':userStripeId,
//                 'sourceId': source.id
//             });
//             console.log('newlyUpdatedSource: ', newlyUpdatedSource);
//             return newlyUpdatedSource
//         } catch(err) {
//             console.log('err: ', err);
//         }
//     }

    
//     // If you want to associate a payment with a particular Customer object, you can include a customer parameter when making a charge request with a source, even if the source is not attached.
//     doNotSaveCardAndCharge = async() => {
//         console.log('doNotSaveCardAndCharge!!!!');
//         const userId = localStorage.getItem('userId');
//         console.log('userId: ', userId);
//         try{
//             const source = await this.createSource();
//             const sourceId = source.id;

//             const res = await axios.get(`${host}/api/users/${userId}`);
//             const userStripeId = res.data.stripeId;
//             console.log('userStripeId: ', userStripeId);
            
//             const body = {
//                 'userStripeId':  userStripeId,
//                 'sourceId': sourceId,
//                 'amountToAddToAccountBalance': this.state.amountToAddToAccountBalance
//             };
//             const chargeResponse = await axios.post(`${host}/api/purchasingAndBilling/createCharge`, body);
//             console.log('chargeResponse: ', chargeResponse)

//         } catch(err) {
//             console.log('err: ', err);
//         }    
//     }
    

//     attachSourceToCustomerAndCharge = async() => {
//         console.log('attachSourceToCustomerAndCharge!!!!');
//         const userId = localStorage.getItem('userId')
//         console.log('userId: ', userId)
//         try {
//             const res = await axios.get(`${host}/api/users/${userId}`);
//             const userStripeId = res.data.stripeId;
//             console.log('userStripeId: ', userStripeId);

//             const source = await this.createSource();
//             const attachSourceToCustomerResponse = await this.attachSourceToCustomer(source);
//             console.log('attachSourceToCustomerResponse: ', attachSourceToCustomerResponse); 

//             // TESTING - Soon to be phased out (but working) credit card charging method
//             const chargeResponse = await axios.post(`${host}/api/purchasingAndBilling/createCharge`, {
//                 'userStripeId':userStripeId,
//                 'sourceId': source.id,
//                 'amountToAddToAccountBalance': this.state.amountToAddToAccountBalance
//             })
//             console.log('chargeResponse: ',chargeResponse)
//         } catch(err) {
//             console.log('err: ', err);
//         }
//     }

//     //If you attempt to charge a Customer object without specifying a source, Stripe uses the customer’s default source.
//     chargeCustomerWithDefaultSource = async() => {
//         console.log('chargeCustomerWithDefaultSource!!!!');
//         const userId = localStorage.getItem('userId')
//         console.log('userId: ', userId)
//         try {
//             const res = await axios.get(`${host}/api/users/${userId}`);
//             const userStripeId = res.data.stripeId;
//             console.log('userStripeId: ', userStripeId);

//             const customerStripeInfo = await axios.post(`${host}/api/purchasingAndBilling/retrieveCustomerStripeInfo`,{'userStripeId':userStripeId});
//             const defaultSourceId = customerStripeInfo.data.defaultSourceId;
//             console.log('defaultSourceId: ', defaultSourceId);

//             // TESTING - Soon to be phased out (but working) credit card charging method
//             const chargeResponse = await axios.post(`${host}/api/purchasingAndBilling/createCharge`, {
//                 'userStripeId':userStripeId,
//                 'sourceId': defaultSourceId,
//                 'amountToAddToAccountBalance': this.state.amountToAddToAccountBalance
//             })
//             console.log('chargeResponse: ',chargeResponse)
//         } catch(err) {
//             console.log('err: ', err.response);
//         }
//     }


//     // makeChargeOld = async(userStripeId,source ) => {
//     //     try{
//     //         // // TESTING - Soon to be phased out (but working) credit card charging method
//     //         const chargeResponse = await axios.post(`${host}/api/purchasingAndBilling/createCharge`, {
//     //             'userStripeId':userStripeId,
//     //             'sourceId': source.id,
//     //             'amountToAddToAccountBalance': amountToAddToAccountBalance
//     //         })
//     //         console.log('chargeResponse: ',chargeResponse)
            
//     //     } catch(err) {
//     //         console.log('err: ', err);
//     //     }
//     // }

//     // makeChargeNew = async(userStripeId,sourceId ) => {
//     //     try{
//     //         //TESTING 1  PaymentIntentMethodOfCharging
//     //         const paymentIntentClientSecret = await axios.post(`${host}/api/purchasingAndBilling/createPaymentIntent`, {'amountToAddToAccountBalance':amountToAddToAccountBalance});
//     //         console.log('paymentIntentClientSecret: ', paymentIntentClientSecret.data.client_secret);
            
//     //         const handleCardPaymentResponse = await this.props.stripe.handleCardPayment(paymentIntentClientSecret.data.client_secret);
            
//     //     } catch(err) {
//     //         console.log('err: ', err);
//     //     }
//     // }


//     handleOptionChange = changeEvent => {
//         this.setState({
//             creditCardUsage: changeEvent.target.value
//         });
//     };


//     componentDidMount() {
//         console.log('componentDidMount');
//     }

//     render() {
//         return (
//                 <div>
//                     <div>
//                         <h1>Add to Account Balance</h1>
//                         <form onSubmit = {this.addToAccountBalance}>
//                             <div>
//                                 Amount to add to account balance: 
//                                 <input
//                                     type = 'number'
//                                     name = 'amountToAddToAccountBalance'
//                                     value = {this.state.amountToAddToAccountBalance}
//                                     onChange = {this.inputChangeHandler}
//                                 />
//                                 {/* <button onClick = {this.addToAccountBalance} type = 'submit'> ADD TO BALANCE </button> */}
//                             </div>
//                         </form>
//                     </div>

//                     <div>
//                         {/*NOTE: Loading Stripe.js asynchronously can speed up your initial page load, especially if you don't show the payment form until the user interacts with your application in some way. (see:https://github.com/stripe/react-stripe-elements#then-load-stripejs-in-your-application)*/}
//                         <h2>Select Payment Method</h2>
//                         <br />
//                         <div>
//                             <h3>Option 1: Manually Enter CC information</h3>
//                             {/*Here we can present user with the option of saving their entered card information */}
//                             <CardElement />
//                             <br/>
                            
//                             <form>
//                                 <div>
//                                     <label>
//                                     <input 
//                                         type = 'radio'
//                                         name = 'saveCreditCardInformationOption'
//                                         value = 'single_use'
//                                         checked = {this.state.creditCardUsage === 'single_use'}
//                                         onChange = {this.handleOptionChange}
//                                     />
//                                     No, I would NOT like to save this credit card for later
//                                     </label>
//                                 </div>

//                                 <div>
//                                     <label>
//                                     <input 
//                                         type = 'radio'
//                                         name = 'saveCreditCardInformationOption'
//                                         value = 'reusable'
//                                         checked = {this.state.creditCardUsage === 'reusable'}
//                                         onChange = {this.handleOptionChange}
//                                     />
//                                     Yes, I would like to save this credit card  for later. 
//                                     </label>
//                                 </div>
//                             </form>

//                             <br/>
//                             <div>
//                                 <h5>I want to save this credit card for later. </h5>
//                                 {/* <button onClick = {this.createPaymentIntentSubmitHandler}>create payment intent</button> */}
                                
//                                 <button onClick = {this.doNotSaveCardAndCharge}>doNotSaveCardAndCharge</button>

//                                 <button onClick = {this.attachSourceToCustomerAndCharge}>attachSourceToCustomerAndCharge</button>

//                                 <button onClick = {this.chargeCustomerWithDefaultSource}>chargeCustomerWithDefaultSource</button>
                                
//                             </div>
//                             <br/>
                            
//                         </div>
//                         <br />
//                         <div> 
//                             <h2>Saved Payment Methods</h2>
//                             <br />
//                             <h3>saved payment method 1</h3>
//                             <h3>saved payment method 2</h3>
//                         </div>
//                     </div>
//                 </div>
//         )
//     }
// }


// // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
// export default injectStripe(AddToAccountBalance);

