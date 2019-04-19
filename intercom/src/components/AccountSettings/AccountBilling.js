import React from "react";
import UpdateBillingWrapper from '../Billing/UpdateBillingWrapper.js';
import AddToBalanceWrapper from '../Billing/AddToBalanceWrapper.js';

const CurrentBilling1 = (props) => {
    return (
        <div className="pull-left" style={{ display: "none" }} >
            {`•••• •••• •••• ${props.last4}`}
        </div>
    )
}

const CurrentBilling2 = (props) => {
    return (
        <div className="pull-left" >
            {`•••• •••• •••• ${props.last4}`}
        </div>
    )
}

const AccountBilling = (props) => {

        return(
            <div className="row">
                <div className="col-md-12">

                    <div className="col-md-4">
                        <h3 style={{ marginTop: "0px" }}>
                            Billing
                        </h3>
                    </div>


                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            
                            <div className="pull-left">
                                {`Account Balance: $${props.accountBalance}`}
                            </div>
                            
                            <div className="pull-right color-elements" onClick={props.toggleChangeAddToBalance}>
                                {props.addToBalance
                                    ? 'Cancel'
                                    : 'Add Money'
                                }
                                
                            </div>
                        </div>
                    </div>

                    {props.addToBalance
                        ?
                        <div className="col-md-8">
                            <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                <div className="pull-left">
                                    <AddToBalanceWrapper
                                        handleAddToBalance={props.handleAddToBalance}
                                        toggleChangeAddToBalance={props.toggleChangeAddToBalance}
                                        updateUserAccountBalance={props.updateUserAccountBalance}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                    }


                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                {props.updateBilling
                                    ? <CurrentBilling1 last4={props.last4} />
                                    : <CurrentBilling2 last4={props.last4} />
                                }
                            </div>
                            <div className="pull-right color-elements" onClick={props.toggleChangeBilling}>
                                {props.updateBilling
                                    ? 'Cancel'
                                    : 'Update Credit Card'
                                }
                            </div>

                        </div>
                    </div>


                    {/* UPDATING PAYMENT INFO */}
                    {props.updateBilling
                        ?
                        <div className="col-md-8">
                            <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                                <div className="pull-left">
                                    <UpdateBillingWrapper
                                        handleBillingUpdate={props.handleBillingUpdate}
                                        toggleChangeBilling={props.toggleChangeBilling}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                    }



                    <div className="col-md-8">
                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                            <div className="pull-left">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {/* <button onClick={props.getSumOfUserTwilioCharges}>getSumOfUserTwilioCharges</button>
                                    <button onClick={props.getSumOfUserStripeCharges}>getSumOfUserStripeCharges</button>
                                    <button onClick={props.updateUserAccountBalance}>updateUserAccountBalance</button>
                                    <button onClick={props.getAllTwilioCharges}>getAllTwilioCharges</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )

}



export default AccountBilling;
