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
  IconCheckbox,
} from "@tabler/icons-react";
import tiktok from "../../../assets/images/tiktok.png";
import fire from "../../../assets/images/fire.png";
import statystic from "../../../assets/images/statystic.png";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { formatShortNumber } from "../../../core/helpers/formatShortNumber";
import { ApiHashtagsAnalytics } from "../../../requests/hashtagsAnalytics";

export const HashtagCard:React.FC<ApiHashtagsAnalytics.ISoundHashtag> = ({
  dailyGrowth,
  hashtag,
  link,
  posts,
  probableNextWeekTrend,
  status,
  views
}) => {
  const [textHashtag, setHashtag] = useState(hashtag);

  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(textHashtag)
      .then(() => {
        setShowCheckbox(true);
        setTimeout(() => {
          setShowCheckbox(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  return (
    <>
      <Box style={{ margin: 0 }}>
        <Paper
          style={{
            height: "50px",
            backgroundColor: "rgba(63, 63, 65, 1)",
            borderRadius: 0,
          }}
        >
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Paper
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(160, 44, 170, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 0,
                }}
              >
                <IconHash size={30} color="white" />
              </Paper>
              <Text fz={16} fw={600} c={"#fff"} lh={1.25} truncate="end" style={{ marginLeft: 8 }}>
                {textHashtag}
              </Text>
            </Flex>
            {showCheckbox ? (
              <IconCheckbox style={{ marginRight: 8 }} />
            ) : (
              <IconCopy style={{ marginRight: 8 }} onClick={handleCopyClick} />
            )}
          </Flex>
        </Paper>
        <Wrapper>
          <Stack gap={12}>
            <Flex justify={"space-between"}>
              <Box>
                <Text fz={12} fw={500} c={"#7A7B81"}>
                  Views
                </Text>
                <Text fz={18} fw={700} c={"#fff"}>
                  {formatShortNumber(views)}
                </Text>
              </Box>
              <Divider orientation="vertical" />
              <Box>
                <Text fz={12} fw={500} c={"#7A7B81"}>
                  Since last day
                </Text>
                <Text fz={18} fw={700} c={"#00b469"}>
                  {`${dailyGrowth}%`}
                </Text>
              </Box>
              <Divider orientation="vertical" />
              <Box>
                <Text fz={12} fw={500} c={"#7A7B81"}>
                  Posts
                </Text>
                <Text fz={18} fw={700} c={"#fff"}>
                  {formatShortNumber(posts)}
                </Text>
              </Box>
            </Flex>
            <Flex justify="space-between">
              <Badge color="rgba(239, 104, 32, 0.15)" size="lg">
                <Flex style={{ alignItems: "center" }}>
                  <span style={{ color: "rgba(255, 148, 91, 1)" }}>trending</span>
                  <IconInfoCircle style={{ marginLeft: 5, color: "rgba(255, 148, 91, 1)" }} />
                </Flex>
              </Badge>
              <Image w={24} src={tiktok} />
              <Flex justify={"space-between"}>
                <Image w={24} src={fire} />
                <Tooltip
                  label={
                    <Flex align="center">
                      <IconInfoCircle />
                      <Text
                        fz={14}
                        fw={600}
                        c={"#fff"}
                        lh={1.25}
                        truncate="end"
                        style={{ marginLeft: 3 }}
                      >
                        Probable trend in the next 7 days?
                      </Text>
                    </Flex>
                  }
                  position="top"
                  placement="start"
                  transition="fade"
                  color="#3f3f41"
                >
                  <Image
                    w={24}
                    src={statystic}
                    alt="Statystic"
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                </Tooltip>
              </Flex>
            </Flex>
            <Divider orientation="horizontal" />
            <Button
              size="xs"
              color="#212122"
              c="lime.4"
              leftSection={<IconLockFilled size={20} />}
              rightSection={
                <Badge color="lime.4" c="black" size="24px" fz={12} px={8}>
                  Pro
                </Badge>
              }
              pr={2}
            >
              Show Category
            </Button>

            <Flex justify="space-between" style={{ position: "relative" }}>
              <Button
                fullWidth
                radius={"xl"}
                variant="filled"
                leftSection={<IconChartAreaLineFilled />}
                color="gray"
                h={40}
                style={{ pointerEvents: "none" }}
              >
                Show Report
              </Button>

              <Button
                fullWidth
                radius={"xl"}
                variant="filled"
                color="gray"
                h={40}
                style={{ pointerEvents: "none" }}
              >
                <Flex align="center">
                  <IconHeart />
                </Flex>
              </Button>

              <IconLockFilled
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#d1fd08",
                }}
              />
            </Flex>
          </Stack>
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
