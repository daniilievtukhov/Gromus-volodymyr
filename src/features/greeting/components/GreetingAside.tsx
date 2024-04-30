import { Avatar, Badge, Box, Button, Space, Stack, Text } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import styled, { keyframes } from "styled-components";

import { useGreetingStore } from "../store";

export const GreetingAside = () => {
  const handleHello = () => {
    useGreetingStore.setState({ greeted: true });
  };

  return (
    <Stack gap={60}>
      <Block bg="dark.7">
        <Avatar radius="50%" size={140} bg="lime.4" color="#000">
          <IconBolt size={60} />
        </Avatar>
        <Space h={15} />
        <Text c="blue">Hi, I’m G.:</Text>
        <Text>Your Personal AI Assistant Beta</Text>
        <Space h={8} />
        <Badge color="lime.4" autoContrast>
          New Beta
        </Badge>
      </Block>
      <AnimatedButton
        variant="white"
        size="lg"
        style={{ alignSelf: "center" }}
        onClick={handleHello}
      >
        <Text fw={600} c="black">
          👋 Hello, G.!
        </Text>
      </AnimatedButton>
    </Stack>
  );
};

const inoutAnim = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(255,255,255,0.4);
  }
  100% {
    box-shadow: 0 0 0 40px rgba(255,255,255,0);
  }
`;

const AnimatedButton: typeof Button = styled(Button)`
  animation: ${inoutAnim} 1.5s ease infinite;
`;

const Block: typeof Box = styled.div`
  background-color: #30313380;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;
