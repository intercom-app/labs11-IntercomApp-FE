import React from 'react';

const About = () => {
	return (
		<section id="about">
			<div className="container">
				<div className="row">
					<div className="col-md-offset-1 col-md-10">
						<div className="text-center">
							<h2>Mission Statement</h2>
							<img className="img-responsive displayed" src="images/short.png" alt="Company about" />
							<div className="row">
								<div className="col-md-12">
									<p>
										Our mission is to assist a wide variety of users ranging from those who may be hearing impaired or elderly to anyone who finds themselves as a group having difficulty conversing with others with overbearing background noise.
										We provide our users to opportunity to easily create and join personal groups and initiate voice chats within those groups to keep a clear communication link with their family and friends.
                  					</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;