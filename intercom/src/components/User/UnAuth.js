import React, { Component } from 'react';
import { Link } from "react-router-dom";

class UnAuth extends Component {

    render() { 
        const id = localStorage.getItem('userId')
        return ( 
            <section className='unauth'>
                <div className='unauth-body'>
                    <h1 className='unauth-header'>Access Denied</h1>
                    <h2 className='unauth-header-sub'>You are not authorized to access this page.</h2>
                    <h2 className='unauth-header-sub'><Link to={`/user/${id}/`} className=''>Go back to your profile</Link></h2>
                </div>
                <div className='unauth-img'></div>
            </section>
        );
    }
}
 
export default UnAuth;