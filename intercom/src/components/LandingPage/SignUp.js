import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
    return (
        <section id="signup">
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-1 col-md-10">
                        <div className="text-center">
                            <h2>Get Started</h2>
                            <img className="img-responsive displayed" src="images/short.png" alt="Company about" />
                            <div className="row">
                                <div className="col-md-12">
                                    <p>Using your phone and headphones, you will have the ability to create voice chatrooms groups, talk directly into your group’s ears, and hear others talk into your ears. You can manage the group, see who is in the group and start up a voice call.</p>
                                </div>

                                <div className="row">
                                    <Link to={`/`} onClick={props.auth.login}>
                                    <button type="button" className="btn btn-md btn-signup col-md-offset-3 col-md-6 col-sm-offset-3 col-sm-6" name="signup">
                                        Sign Up Today!
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;