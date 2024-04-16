import { useNavigate } from "react-router-dom";
import { useState, createContext, useMemo } from "react";
import { Avatar, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBolt } from "@tabler/icons-react";
import { formatDistance } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { FadeBlock } from "../../../components/FadeBlock";
import { useLayoutStore } from "../../../layoutStore";
import { IMessage, setPosts } from "../store";
import axios from "axios";

const _Message = ({ message }: { message: IMessage }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const handleButtonClick = async (link: string) => {
    await axios
      .get(link, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImlldnR1a2hvdm9mZmljaWFsIiwiUm9sZSI6Ik1haW4iLCJTZWN1cml0eVN0YW1wIjoiTTJDWjVPUTNXVFJJR1g1NVg2RzJQN1lNR0tIMk1VS1YiLCJDb3VudHJ5IjoiIiwiQXV0aG9ySWQiOiI2Nzc2MjI1NzI0MDUyMzA4OTk3IiwibmJmIjoxNzEyNjYzMDU5LCJleHAiOjE3MTMyNjc4NTksImlhdCI6MTcxMjY2MzA1OSwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.g35WYaxd4ow-KqjZyR55rieAwV9vFt_1SWTuOIQONZE`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        navigate("/ai-calendar");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log(message);
  return (
    <FadeBlock>
      <Stack>
        <Flex align={"center"} gap={8} justify={"space-between"}>
          <Flex align={"center"} gap={8}>
            <Avatar radius="xl" size={40} bg="lime.4" color="#000">
              {message.isCopilot ? <IconBolt /> : null}
            </Avatar>
            <Text fz="sm" fw="700">
              {message.isCopilot ? "GI" : "You"}
            </Text>
          </Flex>
          <Text fz={12} c="#56595C">
            {formatDistance(new Date(message.date), new Date(), { addSuffix: true })}
          </Text>
        </Flex>
        <StyledText component={typeof message.message === "string" ? "p" : "div"}>
          {message.message}
        </StyledText>

        {((message.dataType === "TimePost") || (!message.data && !message.dataType)) && message.buttons && (
          <>
            <Text c="#D1FD0A" fz={14}>
              Choose an option:
            </Text>
            <Group gap={6}>
              {message.buttons.map((btn) => (
                <StyledButton
                  variant="outline"
                  radius="xl"
                  color="#D1FD0A"
                  onClick={() => {
                    (!message.data && !message.dataType && btn.onClick) 
                    ? btn.onClick()
                    : handleButtonClick(btn?.link || "");

                    if (isMobile) {
                      useLayoutStore.setState({
                        chatOpened: false,
                      });
                    }
                  }}
                >
                  {btn.label}
                </StyledButton>
              ))}
            </Group>
          </>
        )}
      </Stack>
    </FadeBlock>
  );
};

const StyledButton: typeof Button = styled(Button)`
  color: white;
  border-color: #6a6a6a;

  &:hover {
    color: white;
    border-color: #d1fd0a;
  }
`;

const StyledText: typeof Text = styled(Text).attrs({ fz: "sm", fw: "600", lh: "sm" })``;

export const Message = Object.assign(_Message, { Text: StyledText });
