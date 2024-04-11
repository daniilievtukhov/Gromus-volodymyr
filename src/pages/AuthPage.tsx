import { Center } from "@mantine/core";
import { useState } from "react";
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

  return (
    <Wrapper>
      {state === "start" && <AuthStart onChange={setState} />}
      {state === "methods" && <AuthMethods onChange={setState} />}
      {state === "logIn" && <AuthLogIn onChange={setState} />}
      {state === "signUp" && <AuthSignUp onChange={setState} />}
      {state === "confirm" && <AuthConfirm />}
    </Wrapper>
  );
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
