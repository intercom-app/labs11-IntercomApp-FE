import React from 'react';

const Contact = () => {

		const sendEmail = `${process.env.REACT_APP_CONTACT_EMAIL}`

    return (
		<section id="contact">
			<div className="container"> 
				<div className="row">
					<div className="col-md-12">
						<div className="col-lg-12">
							<div className="text-center color-elements">
							<h2>Contact Us</h2>
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<form className="inline" id="contactForm" action={sendEmail} method="POST" >
								<div className="row">
									<div className="col-sm-6 height-contact-element">
										<div className="form-group">
											<input type="text" name="first_name" className="form-control custom-labels" id="name" placeholder="FULL NAME" required data-validation-required-message="Please write your name!"/>
											<p className="help-block text-danger"></p>
										</div>
									</div>
									<div className="col-sm-6 height-contact-element">
										<div className="form-group">
											<input type="email" name="email" className="form-control custom-labels" id="email" placeholder="EMAIL" required data-validation-required-message="Please write your email!"/>
											<p className="help-block text-danger"></p>
										</div>
									</div>
									<div className="col-sm-12 height-contact-element">
										<div className="form-group">
											<input type="text" name="message" className="form-control custom-labels" id="message" placeholder="WHAT'S ON YOUR MIND" required data-validation-required-message="Please write a message!"/>
										</div>
									</div>
									<div className="col-sm-3 col-xs-6 height-contact-element">
										<div className="form-group">
											<input type="submit" className="btn btn-md btn-custom" value="Send It"/>
										</div>
									</div>
									<div className="col-sm-3 col-xs-6 height-contact-element">
										<div className="form-group">
											<button type="button" className="btn btn-md btn-custom" name="reset">RESET
											</button>
										</div>
									</div>
									<div className="col-sm-12 contact-msg">
									    <div id="success"></div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}

export default Contact;