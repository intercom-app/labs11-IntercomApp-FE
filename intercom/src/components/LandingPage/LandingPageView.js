import React from 'react';
import Home from './Home';
import About from './About';
import SignUp from './SignUp';
import Services from './Services';
import Team from './Team';
import Contact from './Contact';
import Footer from './Footer';

const LandingPageView = (props) => {
    return (
        <>
            <Home />
            <About />
            <SignUp {...props}/>
            <Services />
            <Team />
            <Contact />
            <Footer />
        </>

    );
}

export default LandingPageView;