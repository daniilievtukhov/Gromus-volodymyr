import { Box, Flex, Text, Paper, Grid, Stack } from "@mantine/core";
import {
  IconHeart,
  IconHeartFilled,
  IconCheckbox,
  IconInfoCircle,
  IconCopy,
} from "@tabler/icons-react";

import styled from "styled-components";
import { useState } from "react";

type Props = {
  color: string;
  groupName: string;
  hahtags: string[];
  openModal: any;
};

export const BalancedGroupCard: React.FC<Props> = ({ color, groupName, hahtags, openModal }) => {
  const [heartColor, setHeartColor] = useState(false);
  const [copyIcon, setCopyIcon] = useState(false);

  const handleClickHeart = () => {
    setHeartColor(!heartColor);
  };

  const handleClickCopy = () => {
    setCopyIcon(true);
    const textToCopy = hahtags.join("\n");
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => {
      setCopyIcon(false);
    }, 3000);
  };

  return (
    <>
      <Stack gap={0} style={{ margin: 0 }}>
        <Paper
          style={{
            height: "50px",
            backgroundColor: color,
            borderRadius: 0,
          }}
        >
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Text fz={16} fw={600} c={"#fff"} lh={1.25} truncate="end" style={{ marginLeft: 8 }}>
                {`Relevant ${groupName} `}
                <IconInfoCircle
                  stroke={1.5}
                  style={{ verticalAlign: "middle", cursor: "pointer" }}
                  onClick={() => {
                    openModal();
                  }}
                />
              </Text>
            </Flex>
            <Flex align="center">
              <Paper
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#303031",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 0,
                  marginRight: "-1px",
                }}
              >
                {!heartColor ? (
                  <IconHeart
                    size={27}
                    color="#8e8f92"
                    onClick={handleClickHeart}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <IconHeartFilled
                    size={27}
                    color="red"
                    onClick={handleClickHeart}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Paper>
              <Paper
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#484849",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 0,
                }}
                onClick={handleClickCopy}
              >
                {!copyIcon ? <IconCopy style={{ cursor: "pointer" }} /> : <IconCheckbox />}
              </Paper>
            </Flex>
          </Flex>
        </Paper>
        <Wrapper>
          {hahtags.map((hashtag, index) => (
            <span key={index} style={{ marginBottom: "10px" }}>
              <Text fz={16} fw={600} c={"#fff"} lh={1.25} truncate="end">
                {hashtag}&nbsp;
              </Text>
            </span>
          ))}
        </Wrapper>
      </Stack>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;
