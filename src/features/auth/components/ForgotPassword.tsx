import { Wrapper } from "../../../pages/AuthPage";
import { useState } from "react";
import { Center, Stack, Button, Image, TextInput, CloseButton, Group, Notification, rem } from "@mantine/core";
import { IconArrowLeft } from '@tabler/icons-react';
import Logo from "../../../assets/icons/Logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

export const ForgotPassword = () => {
	const icon = <IconX style={{ width: rem(20), height: rem(20) }} />;
	const navigate = useNavigate();
	const [loading, { toggle }] = useDisclosure();
	const [email, setEmail] = useState("");
	const [showNotification, setNotification] = useState(false);
	const handleSubmit = async () => {
		await axios.post('https://react.gromus.ai/api/Account/ForgotPassword', {
			returnUrl: `${window.location.origin}/reset-password`,
			email: email
		}).then(() => { navigate("/check-email") })
			.catch(() => { setNotification(true) });
	}

	return (
		<Wrapper>
			<form>
				<Center>
					<Stack gap={21} w={500} style={{ backgroundColor: '#2e2e2e', padding: "25px" }}>
						<Group justify="space-between">
							<CloseButton onClick={() => navigate(-1)} icon={<IconArrowLeft size={24} stroke={1.5} />} />
							<Image src={Logo} />
							<p></p>
						</Group>
						<label style={{ textAlign: "left" }}>Forgot Your Password? 🔒</label>
						<label>Enter your email and we'll send you instructions to reset your password</label>
						<TextInput label="Email" size="lg" placeholder="Enter your E-Mail" onChange={(event) => setEmail(event.target.value)} />
						<Button loading={loading} onClick={handleSubmit}>Submit</Button>
					</Stack>
				</Center>
				{showNotification && (
					<Notification icon={icon} withCloseButton={false} withBorder color="red" title="Error" mt="md">
						This Email does not exist
					</Notification>)
				}
			</form>
		</Wrapper >
	)
}
