import { Box, Flex, Stack, Text } from "@mantine/core";
import { ReactNode } from "react";
import styled from "styled-components";

import { percentFormat } from "../core/helpers/format";

export const PercentBar = ({ label, value }: { label: ReactNode; value: number }) => {
  return (
    <Stack gap={6}>
      <Flex justify={"space-between"} align={"center"}>
        <Text fz={16} fw={600} c={"#fff"}>
          {label}
        </Text>
        <Text fz={16} fw={600} c={"#fff"}>
          {percentFormat(value)}
        </Text>
      </Flex>
      <Box pos={"relative"}>
        <Bar />
        <Progress $width={value}>
          <Light />
        </Progress>
      </Box>
    </Stack>
  );
};

const Bar = styled.div`
  height: 10px;
  background-color: #212122;
  width: 100%;
`;

const Progress = styled.div<{ $width: number }>`
  padding: 2px;
  padding-right: 0;
  width: ${(p) => p.$width + "%"};
  border-right: 2px solid #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`;

const Light = styled.div`
  height: 100%;
  width: 100%;
  background-color: #d1fd0a;
`;
