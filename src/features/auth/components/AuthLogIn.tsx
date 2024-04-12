import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Environment } from "../../../core/environment";
import { ApiAuth } from "../../../requests/account/auth";
import { notify } from "../../notification";
import { useAuthStore } from "../store/auth";
import { IAuthState } from "../types";
import { Info } from "./Info";
import { TikTokAuthButton } from "./OAuth";
import { OAuth } from "./OAuth";

interface IProps {
  onChange: (state: IAuthState) => void;
}

export const AuthLogIn = ({ onChange }: IProps) => {
  const navigate = useNavigate();

  const setUserName = useAuthStore((state) => state.setUserName);

  const mutation = useMutation({
    mutationFn: ApiAuth.signIn,
    onSuccess: (data) => {
      localStorage.setItem("BEARER_TOKEN", data);
      navigate("/");
    },
    onError: (e: { response: { status: number; data: string } }, form) => {
      notify.error(e.response.data);

      if (e.response.status === 406) {
        ApiAuth.resendConfirm({ userName: form.email, returnUrl: Environment.feDomain });
        setUserName(form.email);
        onChange("confirm");
      }
    },
  });
  const form = useForm({
    initialValues: initialForm,

    validate: {
      email: (value) => (value.trim().length < 1 ? "Required" : null),
      password: (value) => (value.trim().length < 1 ? "Required" : null),
    },
  });

  return (
    <Card py={25} px={20} miw={430} radius={0}>
      <form onSubmit={form.onSubmit((v) => mutation.mutate(v))}>
        <Stack gap={16}>
          <Info
            title="Welcome to Gromus 👋"
            description="Please log in to your account and start the adventure."
            onClose={() => onChange("methods")}
          />
          <TikTokAuthButton />
          <OAuth />
          <Text ta={"center"}>or</Text>
          <TextInput
            tabIndex={2}
            label="Email"
            placeholder="john@example.com"
            size="lg"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            tabIndex={3}
            labelProps={{ w: "100%" }}
            size="lg"
            label={
              <Group justify="space-between">
                Password
                <Anchor
                  fz="xs"
                  fw={600}
                  underline="always"
                  component="button"
                  c="lime.4"
                  tabIndex={6}
                >
                  Forgot Password?
                </Anchor>
              </Group>
            }
            {...form.getInputProps("password")}
          />
          <Checkbox
            tabIndex={4}
            label={<Text fz="xs">Remember Me</Text>}
            {...form.getInputProps("rememberMe", { type: "checkbox" })}
          />
          <StyledButton tabIndex={5} type="submit" loading={mutation.isPending}>
            Log In
          </StyledButton>
        </Stack>
      </form>
    </Card>
  );
};

const StyledButton: typeof Button = styled(Button).attrs({
  size: "lg",
  variant: "white",
})`
  font-size: var(--mantine-font-size-sm);
  color: black;
`;

interface IForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialForm: IForm = {
  email: "",
  password: "",
  rememberMe: false,
};
