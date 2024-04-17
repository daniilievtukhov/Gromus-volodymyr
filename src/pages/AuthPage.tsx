import { Center, Stack, Text, Image, Group, Container } from "@mantine/core";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

import { ellipseBg, discordSvg, instagramSvg } from "../assets";
import { IconBrandTelegram } from "@tabler/icons-react";
import {
  AuthConfirm,
  AuthLogIn,
  AuthMethods,
  AuthSignUp,
  AuthStart,
  IAuthState,
} from "../features/auth";

export const AuthPage = () => {
  const [state, setState] = useState<IAuthState>("start");
  if (isMobile) {
    return (
      <Wrapper>
        <Center style={{ minHeight: "100vh" }}>
          <Stack align="center">
            <Container size={600}>
              <Text style={{ textAlign: "center" }}>
                Our project is currently only available for tablets and desktop devices. If you are
                seeing this message, you are likely accessing it from a mobile device. We would be
                happy to see you using a tablet or laptop. Our team is already working on
                implementing a mobile version.
              </Text>
            </Container>
            <Group>
              <a href="https://discord.com/invite/7gdu2gFFFC" target="_blank">
                <Image src={discordSvg} width={50} />
              </a>
              <a href="https://www.instagram.com/gromus.ai" target="_blank">
                <Image src={instagramSvg} width={50} />
              </a>
              <a href="https://t.me/GROMUSai" target="_blank">
                <IconBrandTelegram style={{ color: "white" }} />
              </a>
            </Group>
          </Stack>
        </Center>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {state === "start" && <AuthStart onChange={setState} />}
        {state === "methods" && <AuthMethods onChange={setState} />}
        {state === "logIn" && <AuthLogIn onChange={setState} />}
        {state === "signUp" && <AuthSignUp onChange={setState} />}
        {state === "confirm" && <AuthConfirm />}
      </Wrapper>
    );
  }
};

const Wrapper = styled(Center)`
  min-height: 100vh;
  padding: 50px 0;
  background-image: url(${ellipseBg});
  background-size: 100% auto;
  background-position: center -20vh;
  background-color: black;
  background-repeat: no-repeat;
`;
