import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Group, Button, Paper, Drawer, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { PricingModal } from './PricingModal.tsx';

import { ModalVideo } from "../../../features/greeting/components/ModalVideo.tsx";

import Logo from "../../../assets/icons/Logo.svg";

const links = [
	{ link: '/', label: 'Main' },
	{ link: '/pricing', label: 'Pricing' },
	{ link: '#', label: 'Use Cases' },
];

const StyledButton = styled(Button)`
    background: rgba(255, 255, 255, 0.1);
    border: transparent;
    border-radius: 8px;
    color: "#fff";
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 15px;
    width: 100px;
    height: 40px;
    transition: width 0.3s, height 0.3s;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.1);
    }
`;

const StyledLoginButton = styled(Button)`
    background: #D1FD0A;
    border-color: #D1FD0A;
    color: black;
    font-size: 15px;
    border-radius: 8px;
    width: 100px;
    height: 40px;
    transition: width 0.3s, height 0.3s;

    &:hover {
        background: #D1FD0B;
        border-color: #D1FD0A;
        color: black;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

const header: React.CSSProperties = {
	position: 'fixed',
	height: 'rem(56px)',
	width: '100%',
	backgroundColor: 'transparent',
	alignItems: 'center',
	backdropFilter: 'blur(10px)',
	paddingTop: "5px",
	zIndex: 9999,
};

const inner: React.CSSProperties = {
	height: "rem(56px)",
	marginRight: "50px",
	alignItems: "center",
}

const burgerItems: React.CSSProperties = {
	marginTop: "25px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "20px",
}

const centerItems: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
}

const StyledDrawer = styled(Drawer)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 2rem;
`;

export const NavBarPricing = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const isSmallScreen = useMediaQuery('(max-width: 975px)');
	const [opened, { open, close }] = useDisclosure(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const items = links.map((link, index) => (
		<a
			key={index}
			href={link.link}
			onClick={toggleDrawer}
			style={{
				color: "white",
				textDecoration: "none",
			}}
		>
			{link.label}
		</a>
	));

	return (
		<header style={header}>
			<Container size={'xxl'} style={inner}>
				{isSmallScreen ? (
					<Burger onClick={toggleDrawer} />
				) : (
					<Group style={centerItems}>
						<img src={Logo} alt="Logo" />

						<Group>
							{items}
							<PricingModal />
						</Group>

						<Group>
							<StyledButton>Join us</StyledButton>
							<StyledLoginButton>LOGIN</StyledLoginButton>
						</Group>

					</Group>
				)}
				<StyledDrawer opened={isDrawerOpen} onClose={toggleDrawer} position="left">
					<Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
						<img src={Logo} alt="Logo" />
						{items}
						<PricingModal />
						<StyledButton>
							Join us
						</StyledButton>
						<StyledLoginButton>
							LOGIN
						</StyledLoginButton>
					</Paper>
				</StyledDrawer>
			</Container>
		</header>
	);
}