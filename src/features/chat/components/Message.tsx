import { useState, createContext, useMemo, useEffect } from "react";
import { Avatar, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBolt } from "@tabler/icons-react";
import { formatDistance } from "date-fns";
import styled from "styled-components";
import { FadeBlock } from "../../../components/FadeBlock";
import { useLayoutStore } from "../../../layoutStore";

import { IMessage, useChatStore } from "../store";

const _Message = ({ message }: { message: IMessage }) => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);

  useEffect(() => {
    if (message.buttons && message.buttons[0] && message.buttons[0].onClick) {
      message.buttons[0].onClick();
    }
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

        {message?.buttons && message.buttons.length && (
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
