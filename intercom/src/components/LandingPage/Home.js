import React from 'react';

const Home = () => {
    return (
        <header id="home" className="carousel slide">
            <ul className="cb-slideshow">
                <li>
                    <span>image1</span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center"><h3>VOICE CHATROOM</h3></div>
                            </div>
                        </div>
                        <h4>Don't lose your voice. Find your Voice Chatroom.</h4>
                    </div>
                </li>
                <li>
                    <span>image2</span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center"><h3>BUILDING RELATIONSHIPS!</h3></div>
                            </div>
                        </div>
                        <h4>One coversation at a time.</h4>
                    </div>
                </li>
                <li>
                    <span>image3</span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center"><h3>REAL TIME COVERSATIONS</h3></div>
                            </div>
                        </div>
                        <h4>Coverse in real time with those around you.</h4>
                    </div>
                </li>
                <li>
                    <span>image4</span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center"><h3>Clear Communication</h3></div>
                            </div>
                        </div>
                        <h4>Communicate at reasonable voice levels.</h4>
                    </div>
                </li>
            </ul>
            <div className="intro-scroller">
                <a className="inner-link" href="#about">
                    <div className="mouse-icon" style={{ opacity: "1" }}>
                        <div className="wheel"></div>
                    </div>
                </a>
            </div>
        </header>

    );
}

export default Home;