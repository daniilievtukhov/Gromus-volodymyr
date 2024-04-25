import { useNavigate } from "react-router-dom";
import { useState, createContext, useMemo, useEffect } from "react";
import { Avatar, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBolt } from "@tabler/icons-react";
import { formatDistance } from "date-fns";
import styled from "styled-components";
import { FadeBlock } from "../../../components/FadeBlock";
import { useLayoutStore } from "../../../layoutStore";
import { IMessage, setPosts } from "../store";
import axios from "axios";
import { useGlobalStore } from "../../../globalStore";
import { useHashtags } from "../../hashtags/store/hashtags";
import { ApiHashtagsAnalytics } from "../../../requests/hashtagsAnalytics";

const fetchPosts = async (link: string) => {
  return await axios.get(link, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("BEARER_TOKEN")}`,
    },
  });
};

const _Message = ({ message }: { message: IMessage }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const handleButtonClick = async (link: string) => {
    const res = await fetchPosts(link);
    // console.log("Message from handleButtonClick", message)
    // console.log("Res from handleButtonClick", res)

    if (message.dataType === "HashtagsPersonal" || message.dataType === "HashtagsGeneral") {
      useHashtags.setState(res.data);
    }

    if (message.dataType === "TimePost") {
      // console.log("Hi! from if and res:", res);
      setPosts(res.data);
    }
  };

  useEffect(() => {
    (async () => {
      console.log(message);
      if (
        (message.dataType === "HashtagsPersonal" || message.dataType === "HashtagsGeneral") &&
        message &&
        message.buttons &&
        message.buttons[0] &&
        message.buttons[0].link
      ) {
        console.log(message.buttons);
        const res = await fetchPosts(message.buttons[0].link);
        // console.log("Hashtags!!!")
        // console.log(res);

        useHashtags.setState(res.data);
        navigate("/hashtags");
      }

      if (
        message.dataType === "TimePost" &&
        message &&
        message.buttons &&
        message.buttons[0] &&
        message.buttons[0].link
      ) {
        const res = await fetchPosts(message.buttons[0].link);

        setPosts(res.data);
        navigate("/ai-calendar");
      }
    })();
  }, [message]);

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

        {(message.dataType === "TimePost" ||
          message.dataType === "HashtagsPersonal" ||
          (!message.data && !message.dataType)) &&
          message.buttons && (
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
                      !message.data && !message.dataType && btn.onClick
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
