import React from "react";
import { Row, Container, Col, Image, Button } from 'react-bootstrap';
import Check from '../../assets/icons/check.svg';
import Close from '../../assets/icons/close.svg';

const pricingHeader: React.CSSProperties = {
	height: "100px",
};

const basicStyle: React.CSSProperties = {
	fontWeight: "700",
	fontSize: "18px",
};

const freeStyle: React.CSSProperties = {
	fontWeight: "500",
	fontSize: "40px",
	color: "#D1FD0A",
};

export const separator: React.CSSProperties = {
	color: "rgba(255, 255, 255, 0.5)",
	height: "2px"
};

const cardContainer: React.CSSProperties = {
	backgroundColor: "rgba(0, 0, 0, 0.35)",
	borderRadius: "16px",
};

const signedText: React.CSSProperties = {
	color: "#D1FD0A",
}

const comingSoonStyle: React.CSSProperties = {
	color: "#D1FD0A",
	background: "rgba(209, 253, 10, 0.05)",
	padding: "8px",
	borderRadius: "16px",
	fontSize: "13px",
}

const freePackageBtn: React.CSSProperties = {
	background: "rgba(255, 255, 255, 0.04)",
	padding: "20px, 32px",
	borderRadius: "8px",
	maxWidth: "450px",
	borderColor: "rgba(255, 255, 255, 0.04)",
	fontSize: "15px",
	fontWeight: "700",
	letterSpacing: "12%",
}

export const subscribePackageBtn: React.CSSProperties = {
	background: "rgba(209, 253, 10, 1)",
	padding: "20px, 32px",
	borderRadius: "8px",
	maxWidth: "450px",
	borderColor: "rgba(209, 253, 10, 1)",
	fontSize: "15px",
	fontWeight: "700",
	letterSpacing: "12%",
}

export const btnDescription: React.CSSProperties = {
	color: "#CBCBCB",
	fontWeight: "400",
	fontSize: "14px",
}

const cardBgContainer: React.CSSProperties = {
	position: "relative",
};

const cardBgContainerAfter: React.CSSProperties = {
	content: "",
	position: "absolute",
	top: "1%",
	left: "100%",
	transform: "translate(-50%, -50%)",
	width: "100%",
	height: "100%",
	maxWidth: "450px",
	maxHeight: "450px",
	background: "radial-gradient(circle at center, rgba(209, 253, 10, 0.05) 15%, transparent 100%)",
	borderRadius: "50%",
	filter: "blur(5px)",
	zIndex: 1,
};

const cardBgContainerRight: React.CSSProperties = {
	position: "relative",
};

const cardBgContainerRightAfter: React.CSSProperties = {
	content: "",
	position: "absolute",
	top: "80%",
	left: "20%",
	transform: "translate(-50%, -50%)",
	width: "100%",
	height: "100%",
	maxWidth: "550px",
	maxHeight: "550px",
	background: "radial-gradient(circle at center, rgba(209, 253, 10, 0.05) 25%, transparent 100%)",
	borderRadius: "50%",
	filter: "blur(5px)",
	zIndex: 1,
};




const CustomBudget = ({ text }: { text: string }) => {
	return (
		<label style={comingSoonStyle} className="mx-1"> {text} </label>
	);
}



export const Pricing = () => {
	return (
		<div>
			<Row className="text-white mx-md-5 justify-content-center">
				<h2 className="text-center">Select your plan to enjoy more from GROMUS AI</h2>
				<p style={signedText} className="text-center">Unlock AI-Powered Solution! Elevate Your Grow Potential Today.</p>

				<Container className="col-xl-4 col-lg-8 col-md-9 col-sm-12 col-xs-12 mb-5">

					<Container style={cardContainer} className="justify-content-center">

						<div style={pricingHeader} className='d-flex justify-content-between align-items-center mx-md-3'>
							<label style={basicStyle}>BASIC</label>
							<label style={freeStyle}>FREE</label>
						</div>

						<hr style={separator} />

						<div className='d-flex align-items-center justify-content-start'>
							<div style={cardBgContainer} className="card-container">
								<ul className="mb-3" style={{ listStyle: "none" }}>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>10 questions</label> for AI Copilot GI
									</li>
									<li className='mb-3'>
										<Image src={Close} /> AI Personalized Best Time & Day to Post
									</li>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>3 times</label> of AI Personalized Account Analytics
									</li>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>3 times</label> of TikTok Any Account Insights
									</li>
									<li className='mb-3'>
										<Image src={Close} /> AI Personalized Hashtags
									</li>
									<li className='mb-3'>
										<Image src={Close} /> Trending Hashtags <CustomBudget text={"coming soon"} />
									</li>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>3 times</label> of TikTok Viral Sounds for any Territories
									</li>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>3 times</label> of Pro Platform
									</li>
									<li className='mb-3'>
										<Image src={Close} /> AI To-Do Artist Plan <CustomBudget text={"coming soon"} />
									</li>
									<li className='mb-3'>
										<Image src={Close} />Spotify AI Analytics <CustomBudget text={"coming soon"} />
									</li>
									<li className='mb-3'>
										<Image src={Close} />Your Song AI Analytics <CustomBudget text={"coming soon"} />
									</li>
								</ul>
								<div style={cardBgContainerAfter}></div>
							</div>
						</div>

						<Container className="text-center mt-3">
							<Button className="w-100 py-3" style={freePackageBtn}>ACTIVATE FOR FREE</Button>
							<label className="text-white mt-3" style={btnDescription}> Use completely free. Cancel anytime. </label>
						</Container>


					</Container>
				</Container>

				<Col className="col-xl-4 col-lg-8 col-md-9 col-sm-12 col-xs-12 mb-5">

					<Container style={cardContainer}>

						<div style={pricingHeader} className='d-flex justify-content-between align-items-center mx-md-3'>
							<label className="text-center" style={basicStyle}>PRO <CustomBudget text={"3 days trial"} /></label>
							<div>
								<label className="text-nowrap" style={freeStyle}>$9.99</label> <label style={signedText}>/ mo</label>
							</div>
						</div>

						<hr style={separator} />

						<div className='d-flex align-items-center justify-content-start'>
							<ul style={{ listStyle: "none" }}>
								<li className='mb-3'>
									<Image height={24} src={Check} /> <label style={signedText}>300 questions</label> for AI Copilot GI
								</li>
								<li className='mb-3'>
									<Image src={Check} /><label style={signedText}>20 times</label> of AI Personalized Best Time & Day to Post
								</li>
								<li className='mb-3'>
									<Image height={24} src={Check} /> <label style={signedText}>20 times</label> of AI Personalized Account Analytics
								</li>
								<li className='mb-3'>
									<Image height={24} src={Check} /> <label style={signedText}>20 times</label> of TikTok Any Account Insights
								</li>

								<li className='mb-3'>
									<Image src={Close} /> AI Personalized Hashtags
								</li>

								<li className='mb-3'>
									<Image src={Check} /> <label style={signedText}>20 times</label> of Trending Hashtags for any Territories <CustomBudget text={"coming soon"} />
								</li>

								<li className='mb-3'>
									<Image height={24} src={Check} /> <label style={signedText}>20 times</label> of TikTok Viral Sounds for any Territories
								</li>

								<li className='mb-3'>
									<Image height={24} src={Check} /> <label style={signedText}>20 times</label> of Pro Platform
								</li>

								<li className='mb-3'>
									<Image src={Check} /> AI To-Do Artist Plan <CustomBudget text={"coming soon"} />
								</li>
								<li className='mb-3'>
									<Image src={Check} />Spotify AI Analytics <CustomBudget text={"coming soon"} />
								</li>
								<li className='mb-3'>
									<Image src={Check} /><label style={signedText}>2 times</label> of Your Song AI Analytics <CustomBudget text={"coming soon"} />
								</li>
							</ul>

						</div>

						<Container className="text-center">
							<Button className="w-100 py-3 text-black" style={subscribePackageBtn}>SUBSCRIBE NOW</Button>
							<label className="text-white w-100 mt-3" style={btnDescription}> $9.99/month. 3-day free trial. Cancel anytime. </label>
						</Container>


					</Container>
				</Col>

				<Col className="col-xl-4 col-lg-8 col-md-9 col-sm-12 col-xs-12 mb-5">

					<Container style={cardContainer}>

						<div style={pricingHeader} className='d-flex justify-content-between align-items-center mx-md-3'>
							<label style={basicStyle}>ADVANCED <CustomBudget text={"3 days trial"} /></label>

							<div>
								<label className="text-nowrap" style={freeStyle}>$19.99 </label><label style={signedText}>/ mo</label>
							</div>


						</div>

						<hr style={separator} />

						<div className='d-flex align-items-center justify-content-start'>
							<div style={cardBgContainerRight}>
								<ul style={{ listStyle: "none" }}>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>1000 questions</label> for AI Copilot GI
									</li>
									<li className='mb-3'>
										<Image src={Check} /><label style={signedText}>Unlimited</label> AI Personalized Best Time & Day to Post
									</li>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>Unlimited</label> AI Personalized Account Analytics
									</li>
									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>Unlimited</label> TikTok Any Account Insights
									</li>

									<li className='mb-3'>
										<Image src={Check} /> AI Personalized Hashtags
									</li>

									<li className='mb-3'>
										<Image src={Check} /> <label style={signedText}>Unlimited</label> Trending Hashtags for any Territories <CustomBudget text={"coming soon"} />
									</li>

									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>Unlimited</label> TikTok Viral Sounds for any Territories
									</li>

									<li className='mb-3'>
										<Image height={24} src={Check} /> <label style={signedText}>Unlimited</label> Pro Platform
									</li>

									<li className='mb-3'>
										<Image src={Check} /> AI To-Do Artist Plan <CustomBudget text={"coming soon"} />
									</li>
									<li className='mb-3'>
										<Image src={Check} />Spotify AI Analytics <CustomBudget text={"coming soon"} />
									</li>
									<li className='mb-3'>
										<Image src={Check} /><label style={signedText}>5 times</label> of Your Song AI Analytics <CustomBudget text={"coming soon"} />
									</li>
								</ul>
								<div style={cardBgContainerRightAfter}></div>
							</div>

						</div>

						<Container className="text-center">
							<Button className="w-100 py-3 text-black" style={subscribePackageBtn}>SUBSCRIBE NOW</Button>
							<label className="text-white w-100 mt-3" style={btnDescription}> $9.99/month. 3-day free trial. Cancel anytime. </label>
						</Container>

					</Container>
				</Col>
			</Row>
		</div>
	);
}
