import { Wrapper } from "../../../pages/AuthPage";
import { Center, Stack, Image, CloseButton, Group } from "@mantine/core";
import { IconArrowLeft } from '@tabler/icons-react';
import Logo from "../../../assets/icons/Logo.svg";
import { useNavigate } from "react-router-dom";

export const CheckEmail = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Center>
                <Stack gap={21} w={500} style={{ backgroundColor: '#2e2e2e', padding: "25px" }}>
                    <Group justify="space-between">
                        <CloseButton onClick={() => navigate(-1)} icon={<IconArrowLeft size={24} stroke={1.5} />} />
                        <Image src={Logo} />
                        <p></p>
                    </Group>
                    <label style={{ textAlign: "left" }}>Password reset 📧</label>
                    <label>We have received your password reset request. Please check your email to complete this process. We have sent you an email with instructions on how to reset your password.</label>
                    <label>If you do not receive the email within a few minutes, please check your spam or junk mail folder. Sometimes our emails can get there by mistake.</label>
                </Stack>
            </Center>
        </Wrapper >
    )
}