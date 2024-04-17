import { Box, BoxProps, Button, Stack, Text } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { Links } from "../../../core/links";

export const PremiumBanner = (props: BoxProps) => {
  const { limit } = useLoaderData() as { limit: number };

  return (
    <Wrapper {...props}>
      <Stack gap="sm">
        <Stack gap={3}>
          <Text fz="xs" lh="xs" fw="600" c="#6F8800">
            Free Plan
          </Text>
          <Text lh="xs" fw="700" c="#000">
            There are {limit} free requests left
          </Text>
        </Stack>
        <StyledButton
          variant="filled"
          color="#000"
          size="xs"
          component="a"
          href={Links.pricing}
          target="_blank"
        >
          Buy Premium
        </StyledButton>
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: #d1fd0a;
  padding: 20px;
`;

const StyledButton: typeof Button = styled(Button)`
  font-size: 14px;
  font-weight: 700;
  width: min-content;
  border-radius: 5px;
`;
