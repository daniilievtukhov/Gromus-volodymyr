import { Button, ButtonProps, createPolymorphicComponent, Image, Stack, Text } from "@mantine/core";
import styled from "styled-components";

import { googleSvg, tiktokSvg } from "../../../assets";
import { Links } from "../../../core/links";

export const OAuth = () => {
  return (
    <Stack gap={16} w="100%">
      <StyledButton
        component="a"
        href={Links.googleAuth}
        leftSection={<Image w={24} src={googleSvg} />}
      >
        Sign-in with Google
      </StyledButton>
    </Stack>
  );
};

export const TikTokAuthButton = () => (
  <StyledButton component="a" href={Links.rootAuth} leftSection={<Image w={24} src={tiktokSvg} />}>
    Sign-in with TikTok
  </StyledButton>
);

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(styled(Button).attrs({
  size: "lg",
  variant: "white",
})<ButtonProps>`
  font-size: var(--mantine-font-size-xs);
  font-weight: 700;
  color: black;
`);
