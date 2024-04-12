import { IconHash, IconCopy } from "@tabler/icons-react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  Paper,
  Image,
  Tooltip,
} from "@mantine/core";
import {
  IconChartAreaLineFilled,
  IconLockFilled,
  IconHeart,
  IconInfoCircle,
  IconHeartFilled,
} from "@tabler/icons-react";
import tiktok from "../../../assets/images/tiktok.png";
import fire from "../../../assets/images/fire.png";
import statystic from "../../../assets/images/statystic.png";
import styled from "styled-components";
import React, { useState } from "react";

type Props = {
  color: string,
  groupName: string,
  hahtags: string[]
}

export const BalancedGroupCard:React.FC<Props> = ({ 
    color,
    groupName,
    hahtags 
  }) => {
    
  const [heartColor, setHeartColor] = useState(false);

  const handleClickHeart = () => {
    setHeartColor(!heartColor);
  };
  return (
    <>
      <Box style={{ margin: 0 }}>
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
                {`Relevant ${groupName}`}
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
              >
                <IconCopy />
              </Paper>
            </Flex>
          </Flex>
        </Paper>
        <Wrapper>
          <Text
            fz={16}
            fw={600}
            c={"#fff"}
            lh={1.25}
            truncate="end"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {hahtags.map(hashtag => (
              <span style={{ marginBottom: "4px" }}>{hashtag}</span>
            ))}
          </Text>
        </Wrapper>
      </Box>
    </>
  );
};
const Wrapper = styled.div`
  min-width: 280px;
  background-color: #212122;
  padding: 20px;
  padding-bottom: 10px;
`;
