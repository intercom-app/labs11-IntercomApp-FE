import React, { Component } from 'react';

const img = require('https://unsplash.com/photos/gehzL37x6zY');

class UnAuth extends Component {

    render() { 
        return ( 
            <section className="container blog">
                <h2>You shall not pass!</h2>
                <div style={{ textAlign: "center", backgroundImage: `url(https://unsplash.com/photos/gehzL37x6zY)` }}>

                </div>
            </section>
        );
    }
}
 
export default UnAuth;