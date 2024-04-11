import {
  Anchor,
  Button,
  ButtonProps,
  Card,
  createPolymorphicComponent,
  Stack,
  Text,
} from "@mantine/core";
import { IconMailFilled } from "@tabler/icons-react";
import styled from "styled-components";

import { IAuthState } from "../types";
import { Info } from "./Info";
import { OAuth } from "./OAuth";
import { TikTokAuthButton } from "./OAuth";

interface IProps {
  onChange: (state: IAuthState) => void;
}

export const AuthMethods = ({ onChange }: IProps) => {
  return (
    <Card py={25} px={60} radius={0}>
      <Stack gap={30}>
        <Info
          description={
            <>
              <Text c="white">
                To receive personalized recommendations, you need to log in through TikTok.
              </Text>
              <Text fw={700} style={{ color: "rgb(210, 254, 8)", marginTop: "20px" }}>
                We use the official TikTok authorisation method. We do not store or recieve your
                personal data.
              </Text>
            </>
          }
        />

        <Stack gap={16}>
          <TikTokAuthButton />
        </Stack>
        <Stack ta="center" align="center" gap={6}>
          <Text fw={500} c="white" ff="mono" w={280}>
            Other login methods will allow you to access any data, except for personalizations.
          </Text>
        </Stack>
        <Stack gap={10} align="center">
          <OAuth />
          <Text>or</Text>
          <StyledButton leftSection={<IconMailFilled />} onClick={() => onChange("signUp")}>
            Sign-up with E-mail
          </StyledButton>
        </Stack>

        <Text fz="xs" fw={600}>
          Already have an account?{" "}
          <Anchor
            fz="xs"
            fw={600}
            underline="always"
            c="lime.4"
            component="button"
            onClick={() => onChange("logIn")}
          >
            Log In instead
          </Anchor>
          .
        </Text>
      </Stack>
    </Card>
  );
};

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(styled(Button).attrs({
  size: "lg",
  variant: "outline",
  fullWidth: true,
})<ButtonProps>`
  font-size: var(--mantine-font-size-xs);
  font-weight: 700;
  color: white;
  border-color: var(--mantine-color-gray-7);
`);
