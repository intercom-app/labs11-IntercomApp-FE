import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

class Authenticating extends Component {
  render() {

    return (
      <section className="container blog">
        <h2>Authenticating...</h2>
        <div style={{ textAlign: "center" }}>
          <Loader type="Bars" color="#33cc33" height="100" width="100" />
        </div>
      </section>
    );
  }
}

export default Authenticating;