import { Center, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

import { ellipseBg } from "../assets";
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
      <Center style={{ minHeight: "100vh" }}>
        <Stack spacing="md">
          <Text size="xl">
            Sorry, we are working to make the site available on mobile devices in the near future.
          </Text>
        </Stack>
      </Center>
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