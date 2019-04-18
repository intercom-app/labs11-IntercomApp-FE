import React, { Component } from "react";


const AccountPlanDetails = (props) => {

    return(
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4">
                    <h3 style={{ marginTop: "0px" }}>
                        Plan Details
                    </h3>
                </div>
                <div className="col-md-8">
                    <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                        <div className="pull-left">
                            {`${props.user.billingSubcription}`.toUpperCase()} Membership
                                            </div>
                        <div className="pull-right">
                            Upgrade
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                        <div className="pull-left">
                            Pay as you chat
                        </div>
                        <div className="pull-right">
                            Details
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPlanDetails;