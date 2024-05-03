
import { Button, Grid } from '@mantine/core';
import Gromus from '../../../assets/icons/Logo.svg';
import DiscordIcon from '../../../assets/icons/mingcute_discord-fill.svg';
import InstIcon from '../../../assets/icons/mingcute_ins-fill.svg';
import SpotifyIcon from '../../../assets/icons/mingcute_spotify-fill.svg';

import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #0D0D0E !important;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
`;

const SignedUnderlineText = styled.label`
  color: #D1FD0A;
  text-decoration: underline;
`;

const StyledFooterButton = styled(Button)`
    background: #D1FD0A;
    border-color: #D1FD0A;
    color: black;
    font-size: 15px;
    border-radius: 8px;
    width: 100px;
    height: 40px;
    transition: width 0.3s, height 0.3s;
    margin: 5px;

    &:hover {
        background: #D1FD0B;
        border-color: #D1FD0A;
        color: black;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

export function Footer() {
	return (
		<FooterWrapper>
			<Grid style={{ paddingLeft: "50px", gap: 50 }} justify='center'>
				<Grid.Col style={{ paddingLeft: "20px", flexDirection: "column", textAlign: "left", alignItems: "flex-start", backgroundColor: "#0D0D0E" }} span={{ base: 8, xs: 8, sm: 6, md: 4, lg: 4 }}>
					<img height={30} width={170} src={Gromus} /> <br />
					<label>Sparks of inspiration are in every note.</label>
				</Grid.Col>

				<Grid.Col style={{ padding: "0px", textAlign: "left", backgroundColor: "#0D0D0E" }} span={{ base: 12, xs: 8, sm: 6, md: 4, lg: 4 }}>
					<Grid>
						<Grid.Col style={{ textAlign: "left", backgroundColor: "#0D0D0E" }} span={4}>
							<ul style={{ listStyle: "none", textAlign: "left", paddingLeft: "0px", backgroundColor: "#0D0D0E" }}>
								<li>
									<a>SOLUTION</a>
								</li>
								<li>
									<a>Use Cases</a>
								</li>
							</ul>
						</Grid.Col>
						<Grid.Col style={{ textAlign: "left", backgroundColor: "#0D0D0E" }} span={3}>
							<ul style={{ listStyle: "none", textAlign: "left", paddingLeft: "0px", backgroundColor: "#0D0D0E" }}>
								<li>
									<a>COMPANY</a>
								</li>
								<li>
									<a>Pricing</a>
								</li>
								<li>
									<a>Contact</a>
								</li>
							</ul>
						</Grid.Col>
						<Grid.Col style={{ textAlign: "left", backgroundColor: "#0D0D0E" }} span={3}>
							<ul style={{ listStyle: "none", textAlign: "left", paddingLeft: "0px", backgroundColor: "#0D0D0E" }}>
								<li>
									<a>RESOURCES</a>
								</li>
								<li>
									<a>Blog</a>
								</li>
								<li>
									<a>Privacy Policy</a>
								</li>
								<li>
									<a>Cookie Policy</a>
								</li>
							</ul>
						</Grid.Col>
					</Grid>
				</Grid.Col>



				<Grid.Col style={{ padding: "0px", backgroundColor: "#0D0D0E" }} span={{ base: 8, xs: 8, sm: 6, md: 4, lg: 4 }}>
					<h4>Are you an artist?</h4>
					<Grid style={{ backgroundColor: "#0D0D0E" }}>

						<Grid.Col style={{ backgroundColor: "#0D0D0E" }} span={12}>
							<SignedUnderlineText> Work with us as an artist </SignedUnderlineText>
							<StyledFooterButton>
								Submit
							</StyledFooterButton>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={12} style={{ backgroundColor: "#0D0D0E" }}>
							<img style={{ padding: "10px" }} src={DiscordIcon} />
							<img style={{ padding: "10px" }} src={InstIcon} />
							<img style={{ padding: "10px" }} src={SpotifyIcon} />
						</Grid.Col>
					</Grid>

				</Grid.Col>

			</Grid>
			<Grid style={{ paddingLeft: "30px" }}>
				<Grid.Col style={{ backgroundColor: "#0D0D0E" }} span={{ base: 10, sm: 4 }}>
					<label>Copyright © 2024 Gromus, Inc</label>
				</Grid.Col>
				<Grid.Col style={{ backgroundColor: "#0D0D0E" }} span={{ base: 10, sm: 8 }}>
					<label>Gromus, Inc is not affiliated with or endorsed by TikTok© Inc. or ByteDance© Ltd.</label> <br />
					<label>  All product and company names are registered trademarks of their original owners</label>
				</Grid.Col>
			</Grid>
		</FooterWrapper>
	);
}