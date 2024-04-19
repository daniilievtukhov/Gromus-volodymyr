import { Avatar, Stack, Title } from "@mantine/core";
import { IconSparkles, IconVinyl } from "@tabler/icons-react";
import styled from "styled-components";
import { Pricing } from "../../../pages/pricing/components/Pricing";
import { useGlobalStore } from "../../../globalStore";

import { Greeting, useGreetingStore } from "../../greeting";

export const MainStart = () => {
  const { userInfo } = useGlobalStore();
  const store = useGlobalStore();
  const greeted = useGreetingStore((state) => state.greeted);

  return (
    <Wrapper $align={greeted ? "center" : "start"}>
      {greeted ? (
        <Block gap={36}>
          {store.limit === 0 && <Pricing />}
          <Avatar.Group>
            <Avatar radius="xl" size={60} bg="lime.4" color="#000">
              <IconSparkles size={32} />
            </Avatar>
            <Avatar radius="xl" size={60} bg="#fff" color="#000">
              <IconVinyl size={32} />
            </Avatar>
          </Avatar.Group>

          <StyledTitle textWrap="wrap">
            Hello, {userInfo.firstname || userInfo.userName}!
            <br />
            How can I help you today?
          </StyledTitle>
        </Block>
      ) : (
        <Greeting />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $align?: "start" | "center" }>`
  display: flex;
  justify-content: center;
  align-items: ${({ $align }) => $align ?? "start"};
  padding: 42px;
  min-height: 100vh;
`;

const Block = styled(Stack)`
  max-width: 730px;
`;

const StyledTitle = styled(Title)`
  font-size: 96px;
  font-weight: 400;
  line-height: 100px;
  text-align: start;
`;
