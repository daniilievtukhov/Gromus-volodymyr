import { ActionIcon, Button, Flex, Text } from "@mantine/core";
import { IconBolt, IconX } from "@tabler/icons-react";
import styled from "styled-components";

import { setChatOpened } from "../../../layoutStore";
import { clearChat } from "../store";

export const Header = () => {
  return (
    <Wrapper>
      <Flex gap={8} justify={"space-between"} align={"center"}>
        <Flex align={"center"} gap={4}>
          <IconBolt color="#000" size={16} />
          <Text fz="xs" lh="xs" fw="600" c="black">
            AI Assistant
          </Text>
          <Button ml={8} size="compact-xs" variant="outline" color="#000" onClick={clearChat}>
            Clear chat
          </Button>
        </Flex>
        <ActionIcon
          variant="subtle"
          color="black"
          radius={"xl"}
          size={"sm"}
          onClick={() => setChatOpened(false)}
        >
          <IconX />
        </ActionIcon>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #d1fd0a;
  padding: 8px 12px;
`;
