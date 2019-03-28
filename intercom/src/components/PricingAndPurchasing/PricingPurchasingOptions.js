import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from "../../App";
import PricingPlan1 from './PricingPlan1'
import PricingPlan1 from './PricingPlan2'

class PricingPurchasingOptions extends Component {
    constructor() {
        super();
        this.state = {stateKey1: 'stateKey1_value'};
    }

    pricingPurchasingFunction1 = () => {
        console.log('pricingPurchasingOptionsFunction1')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    render() {
        return (
            <div>
                {/* PRICING PLAN 1 COMPONENT */}
                <PricingPlan1 />

                {/* PRICING PLAN 2 COMPONENT */}
                <PricingPlan2 />

            </div>
        )
    }
}

export default PricingPurchasingOptions;