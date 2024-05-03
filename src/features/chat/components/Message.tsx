import { useState, createContext, useMemo, useEffect } from "react";
import { Avatar, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { formatDistance } from "date-fns";
import styled from "styled-components";
import { FadeBlock } from "../../../components/FadeBlock";
import { useLayoutStore } from "../../../layoutStore";
import { IMessage, useChatStore } from "../store";
import AiLogo from "../../../assets/icons/ai_logo.svg";

const _Message = ({ message }: { message: IMessage }) => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);

  useEffect(() => {
    if (message.buttons && message.buttons[0] && message.buttons[0].onClick) {
      message.buttons[0].onClick();
    }
  }, [message]);

  const ButtonPresets = () => {
    return (
      <>
        {message?.buttons && message.buttons.length > 1 && (
          <>
            <Text c="#D1FD0A" fz={14}>
              Choose an option:
            </Text>
            <Group gap={6}>
              {message.buttons.map((btn) => (
                <StyledButton
                  key={btn.label}
                  variant="outline"
                  radius="xl"
                  color="#D1FD0A"
                  onClick={() => {
                    btn.onClick && btn.onClick();

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
      </>
    );
  };

  return (
    <FadeBlock>
      <Stack>
        <Flex align={"center"} gap={8} justify={"space-between"}>
          <Flex align={"center"} gap={8}>
            <Avatar radius="xl" size={40} bg="lime.4" color="#000">
              {message.isCopilot ? <img src={AiLogo} width={50} height={50} /> : null}
            </Avatar>
            <Text fz="sm" fw="700">
              {message.isCopilot ? " " : "You"}
            </Text>
          </Flex>
          <Text fz={12} c="#56595C">
            {formatDistance(new Date(message.date), new Date(), { addSuffix: true })}
          </Text>
        </Flex>
        <StyledText component={typeof message.message === "string" ? "p" : "div"}>
          {message.message}
        </StyledText>
        <ButtonPresets />
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
