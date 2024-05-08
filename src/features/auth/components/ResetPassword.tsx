import { Wrapper } from "../../../pages/AuthPage";
import { useState } from "react";
import { Center, Stack, Image, CloseButton, Group, PasswordInput, TextInput, Button, Notification, rem } from "@mantine/core";
import { IconArrowLeft } from '@tabler/icons-react';
import Logo from "../../../assets/icons/Logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Links } from "../../../core/links";
import { IconX } from '@tabler/icons-react';
import { error } from "console";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [showNotification, setNotification] = useState(false);
    const code = GetCode() || "";
    const icon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const [formData, setFormData] = useState<ResetPasswordData>({
        email: "",
        password: "",
        confirmPassword: "",
        code: code
    });
    const handleInputChange = (fieldName: keyof ResetPasswordData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var response = await axios.post(`${Links.api}/Account/ResetPassword`, {
            ...formData
        }).then(response => { localStorage.setItem("BEARER_TOKEN", response.data); navigate("/") })
            .catch(() => { setNotification(true) });
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Center>
                    <Stack gap={21} w={500} style={{ backgroundColor: '#2e2e2e', padding: "25px" }}>
                        <Group justify="space-between">
                            <CloseButton onClick={() => navigate(-1)} icon={<IconArrowLeft size={24} stroke={1.5} />} />
                            <Image src={Logo} />
                            <p></p>
                        </Group>
                        <label style={{ textAlign: "left" }}>Password change</label>
                        <TextInput placeholder="Enter your E-Mail address" onChange={handleInputChange('email')} />
                        <PasswordInput placeholder="Enter your new password" onChange={handleInputChange('password')} />
                        <PasswordInput placeholder="Confirm your new password" onChange={handleInputChange('confirmPassword')} />
                        <Button type="submit">Change password</Button>
                    </Stack>
                </Center>
                {showNotification && (
                    <Notification icon={icon} withCloseButton={false} withBorder color="red" title="Error" mt="md">
                        Something went wrong. Check your password and Email
                    </Notification>)
                }
            </form>
        </Wrapper >
    )
}

interface ResetPasswordData {
    email: string;
    password: string;
    confirmPassword: string;
    code: string;
}

function GetCode() {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("code");
}