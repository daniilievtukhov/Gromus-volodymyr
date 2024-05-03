import { Avatar, Badge, Box, Button, Space, Stack, Text } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import styled, { keyframes } from "styled-components";

import { useGreetingStore } from "../store";
import { AnimatedButtonWh } from "../../../components/AnimatedButton";

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
        <Text c="blue">Hi, I’m G:</Text>
        <Text>Your Personal AI Assistant Beta</Text>
        <Space h={8} />
        <Badge color="lime.4" autoContrast>
          New Beta
        </Badge>
      </Block>
      <AnimatedButtonWh title="Hello, G!" icon="👋" onClick={handleHello} />
    </Stack>
  );
};

const Block: typeof Box = styled.div`
  background-color: #30313380;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;
