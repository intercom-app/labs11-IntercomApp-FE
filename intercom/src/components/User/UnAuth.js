import React, { Component } from 'react';
import { Link } from "react-router-dom";


class UnAuth extends Component {

    render() { 
        // const img = require('../../images/avatar1.png')
        const id = localStorage.getItem('userId')
        return ( 
            <section className="container blog">
                <div style={{ textAlign: "center", marginBottom: "5%" }}>
                    <h2 >You shall not pass!</h2>
                    <Link to={`/user/${id}/`} className=''>Go back to your profile</Link>
                </div>
                <div className='unauth'></div>
            </section>
        );
    }
}
 
export default UnAuth;