import { Flex, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import styled from "styled-components";

export const VerifiedLabel = () => {
  return (
    <Flex gap={6}>
      <Circle>
        <IconCheck size={12} strokeWidth={2} />
      </Circle>
      <Text c={"#53d2e3"} tt={"uppercase"} fz={10} fw={700}>
        Verified
      </Text>
    </Flex>
  );
};

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #fff;
  background-color: #53d2e3;
  border-radius: 100px;
`;
