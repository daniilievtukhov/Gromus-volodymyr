import { Grid, Button, Container, Paper, Group } from "@mantine/core";
import styled from "styled-components";
import { SignedText, SubscribePackageBtn } from "../../../pages/pricing/components/Pricing";

export const Video = () => {

	const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
`;

	return (
		<>
			<Grid justify="center" style={{ backgroundColor: '#0D0D0E' }}>
				<Grid.Col>
					<Paper style={{ textAlign: "center", marginBottom: "10px", backgroundColor: '#0D0D0E' }}>
						<h2 style={{ fontSize: "48px" }}>Personalized Best Time & Day to Post</h2>
						<SignedText>Unlock AI-Powered Solution! Elevate Your Grow Potential Today.</SignedText>
					</Paper>

					<Grid justify="center" align="center" style={{ margin: "30px" }}>
						<Group style={{ justifyContent: "center" }}>
							<VideoContainer>
								<iframe
									src="https://www.loom.com/embed/1cf8b73bc30a413db3877cd3f27a0826?sid=db711b31-66a8-4b28-a64f-aee3ba57e5d3"
									frameBorder="0"
									allowFullScreen
									width="1000px"
									height="500px"
								/>
							</VideoContainer>
						</Group>
					</Grid>
					<Grid justify="center" style={{ margin: "50px" }}>
						<Paper
							style={{
								textAlign: "center",
								justifyContent: "center",
								marginBottom: "10px",
								width: "40%",
								backgroundColor: '#0D0D0E',
							}}
						>
							<SubscribePackageBtn>TRY IT NOW</SubscribePackageBtn>
						</Paper>
					</Grid>
				</Grid.Col>
			</Grid>
		</>

	);
}