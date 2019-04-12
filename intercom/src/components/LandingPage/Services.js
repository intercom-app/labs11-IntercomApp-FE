import React from 'react';

const Services = () => {
    return (
		<section id="services">
			<div className="greenback">
				<div className="container">
					<div className="text-center homeport2"><h2>Services</h2></div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 homeservices1">
							<div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
								<div className="text-center">
									<span className="fa-stack fa-lg">
									  <i className="fa fa-circle fa-stack-2x"></i>
									  <i className="fa fa-sign-in fa-stack-1x"></i>
									</span>
									<h3>Trusted Sign-Up</h3>
									<p>Registration and Login is handled entirely by Auth0, a secure and trusted authentication platform. Simply use your gmail account or another preferred email and password to begin.</p>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
								<div className="text-center">									
									<span className="fa-stack fa-lg">
									  <i className="fa fa-circle fa-stack-2x"></i>
									  <i className="fa fa-users fa-stack-1x"></i>
									</span>
									<h3>Group Chatrooms</h3>
									<p>Create personal group chatrooms and invite your family and friends to join. Once group members have accepted their invitations you can start communicating with ease.</p>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
								<div className="text-center">
									<span className="fa-stack fa-lg">
									  <i className="fa fa-circle fa-stack-2x"></i>
									  <i className="fa fa-phone fa-stack-1x"></i>
									</span>
									<h3>Chatroom Calls</h3>
									<p>Conversations can happen anywhere at anytime. Using Twilio, a reliable voice application, Voice Chatroom allows you the ability to start and join real-time conversations within your group.</p>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
								<div className="text-center">
									<span className="fa-stack fa-lg">
									  <i className="fa fa-circle fa-stack-2x"></i>
									  <i className="fa fa-cogs fa-stack-1x"></i>
									</span>
									<h3>Secure Billing</h3>
									<p>Your online payments are safe with us. We utilize Stripe, the best billing software platform, to securely handle all online payments and billing options for our users.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}

export default Services;