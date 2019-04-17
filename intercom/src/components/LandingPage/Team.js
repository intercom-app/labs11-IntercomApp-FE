import React from 'react';

const Team = () => {
    return (
		<section id="meet-team">
			<div className="container">
				<div className="text-center">
				<h2>Team Members</h2>
				<img className="img-responsive displayed" src="images/short.png" alt="about" />
				</div>
				<div className="row teamspace">
					<div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
						<div className="team-member">
							<div className="team-img">
								<img className="img-responsive" src={"https://avatars3.githubusercontent.com/u/11194836?s=400&v=4"} alt="github-adrian-adames" />
							</div>
							<div className="team-info">
								<h3>Adrian Adames</h3>
								<span>Web Developer</span>
							</div>
							<ul className="social-icons">
								<li><a href="https://github.com/adrianadames" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
							</ul>
						</div>
					</div>

					<div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
						<div className="team-member">
							<div className="team-img">
								<img className="img-responsive" src={"https://avatars3.githubusercontent.com/u/18264960?s=400&v=4"} alt="github-erinç-emer" />
							</div>
							<div className="team-info">
								<h3>Erinç Emer</h3>
								<span>Web Developer</span>
							</div>
							<ul className="social-icons">
								<li><a href="https://github.com/erinc35" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
							</ul>
						</div>
					</div>

                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
						<div className="team-member">
							<div className="team-img">
								<img className="img-responsive" src={"https://avatars1.githubusercontent.com/u/39572677?s=400&v=4"} alt="github-stephen-fargali" />
							</div>
							<div className="team-info">
								<h3>Stephen Fargali</h3>
								<span>Web Developer</span>
							</div>
							<ul className="social-icons">
								<li><a href="https://github.com/farste" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
							</ul>
						</div>
					</div>

                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
						<div className="team-member">
							<div className="team-img">
								<img className="img-responsive" src={"https://avatars0.githubusercontent.com/u/44040846?s=400&v=4"} alt="github-chelsea-tolnai" />
							</div>
							<div className="team-info">
								<h3>Chelsea Tolnai</h3>
								<span>Web Developer</span>
							</div>
							<ul className="social-icons">
								<li><a href="https://github.com/ChelseaTolnai" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
							</ul>
						</div>
					</div>

                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
						<div className="team-member">
							<div className="team-img">
								<img className="img-responsive" src={"https://avatars3.githubusercontent.com/u/44141603?s=400&v=4"} alt="github-sergey-osipyan" />
							</div>
							<div className="team-info">
								<h3>Sergey Osipyan</h3>
								<span>IOS Developer</span>
							</div>
							<ul className="social-icons">
								<li><a href="https://github.com/SeriARM" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
							</ul>
						</div>
					</div>

					<div className="col-xs-4 col-sm-4 col-md-2 col-lg-2 col-lg-2">
						<div className="team-member">
							<div className="team-img">
								<img className="img-responsive" src={"https://avatars1.githubusercontent.com/u/16520320?s=400&v=4"} alt="github-jurgen-kela" />
							</div>
							<div className="team-info">
								<h3>Jurgen Kela</h3>
								<span>Project Manager</span>
							</div>
							<ul className="social-icons">
								<li><a href="https://github.com/kelajatu" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}

export default Team;