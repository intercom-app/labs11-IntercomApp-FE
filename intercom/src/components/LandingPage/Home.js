import React from 'react';

const Home = () => {
    return (
        <>
            <header id="home" className="carousel slide">
                <ul className="cb-slideshow">
                    <li>
                        <span>image1</span>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center"><h3>SMART BUSINESS SOLUTIONS!</h3></div>
                                </div>
                            </div>
                            <h4>PATROS – Free HTML5/CSS3 Responsive Website Template.</h4>
                        </div>
                    </li>
                    <li>
                        <span>image2</span>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center"><h3>PREMIUM CREATIVE CONTENT!</h3></div>
                                </div>
                            </div>
                            <h4>Lorem Ipsum is simply dummy text of typesetting industry.</h4>
                        </div>
                    </li>
                    <li>
                        <span>image3</span>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center"><h3>UNIQUE DESIGN!</h3></div>
                                </div>
                            </div>
                            <h4>Lorem Ipsum is simply dummy text of typesetting industry.</h4>
                        </div>
                    </li>
                    <li>
                        <span>Image 04</span>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center"><h3>WEB AND GRAPHICS DESIGN</h3></div>
                                </div>
                            </div>
                            <h4>Lorem Ipsum is simply dummy text of typesetting industry.</h4>
                        </div>
                    </li>
                    <li>
                        <span>Image 05</span>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center"><h3>DIGITAL MARKETING SOLUTIONS</h3></div>
                                </div>
                            </div>
                            <h4>Lorem Ipsum is simply dummy text of typesetting industry.</h4>
                        </div>
                    </li>
                    <li>
                        <span>Image 06</span>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center"><h3>SEARCH ENGINE OPTIMIZATION!</h3></div>
                                </div>
                            </div>
                            <h4>Lorem Ipsum is simply dummy text of typesetting industry.</h4>
                        </div>
                    </li>
                </ul>
                <div className="intro-scroller">
                    <a className="inner-link" href="#about">
                        <div className="mouse-icon" style={{opacity: "1"}}>
                            <div className="wheel"></div>
                        </div>
                    </a>
                </div>
            </header>
        </>

    );
}

export default Home;