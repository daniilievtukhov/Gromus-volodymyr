import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { subscribePackageBtn } from '../pages/pricing/Pricing';
import LogoGromus from "../assets/icons/Logo.svg";

const navBarStyle: React.CSSProperties = {
	background: "transparent",
	backdropFilter: "blur(10px)",
	color: "#fff",
}

const joinUsBtn: React.CSSProperties = {
	background: "rgba(255, 255, 255, 0.1)",
	border: "transparent",
	color: "#fff",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	fontSize: "15px",
}

export const NavBarPricing = () => {
	return (
		<Navbar expand="md" style={navBarStyle} className='position-absolute fixed-top py-2'>
			<Container>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">

					<Nav className="me-auto d-flex justify-content-center align-items-center text-white">
						<Nav.Link className='text-white' href="/">
							<Image src={LogoGromus} height={20} />
						</Nav.Link>
					</Nav>

					<Nav className="d-flex justify-content-center align-items-center text-white gap-2">
						<Nav.Link className='text-white' href="#features" >Main</Nav.Link>
						<Nav.Link className='text-white' href="#features" >Pricing</Nav.Link>
						<Nav.Link className='text-white' href="#features" >Use cases</Nav.Link>
					</Nav>

					<Nav className="ms-auto d-flex justify-content-center align-items-center text-white gap-2">
						<Button className='text-white px-5 py-2' style={joinUsBtn}>Join Us</Button>
						<Button className='text-black px-5 py-2' style={subscribePackageBtn}>Login</Button>
					</Nav>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
