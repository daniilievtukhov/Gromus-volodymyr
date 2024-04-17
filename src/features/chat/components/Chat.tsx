import { AppShell, Divider, Flex, ScrollArea, Skeleton, Stack, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { Fragment, memo, useEffect, useRef } from "react";
import styled from "styled-components";

import { useGlobalStore } from "../../../globalStore";
import { Greeting, useGreetingStore } from "../../greeting";
import { useChatHistoryData } from "../hooks/useChatHistoryData";
import { useSendMessage } from "../hooks/useSendMessage";
import { useChatStore } from "../store";
import { Header } from "./Header";
import { Message } from "./Message";
import { PremiumBanner } from "./PremiumBanner";

export const Chat = memo(() => {
  const { userInfo } = useGlobalStore();

  const greeted = useGreetingStore((state) => state.greeted);
  const { messages } = useChatStore();

  const { prompt, send, setPrompt, isPending } = useSendMessage();

  const { isLoading, isSuccess } = useChatHistoryData();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages, isPending, isSuccess]);

  return (
    <Aside>
      {greeted ? (
        <>
          <Header />
          {userInfo.inTrial && <PremiumBanner />}

          <AppShell.Section viewportRef={ref} grow component={ScrollArea} py={30} px={16}>
            {isLoading && (
              <Stack gap={16}>
                <MessageSkeleton />
                <MessageSkeleton />
                <MessageSkeleton />
              </Stack>
            )}
            {isSuccess &&
              messages.map((el, idx, arr) => (
                <Fragment key={idx}>
                  <Message message={el} />
                  {idx < arr.length - 1 && <Divider my={25} />}
                </Fragment>
              ))}
            {isPending && (
              <>
                <Divider my={25} />
                <Message
                  message={{
                    message: "Typing...",
                    isCopilot: true,
                    date: new Date().toISOString(),
                  }}
                />
              </>
            )}
          </AppShell.Section>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            variant="unstyled"
            placeholder="Enter your request..."
            rightSection={<IconSend2 />}
            rightSectionProps={{
              onClick: () => send(prompt),
            }}
            onKeyDown={(e) => {
              if (["Enter", "NumpadEnter"].includes(e.code)) {
                send(prompt);
              }
            }}
          />
        </>
      ) : (
        <Greeting.Aside />
      )}
    </Aside>
  );
});

const Aside = styled(AppShell.Aside)`
  @media (min-width: 768px) {
    background-color: #31323440;
  }

  justify-content: center;
`;

const Input = styled(TextInput)`
  background-color: var(--mantine-color-dark-7);
  padding: 12px 20px;

  .mantine-TextInput-section {
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: var(--mantine-color-gray-0);
    }
  }
`;

const MessageSkeleton = () => (
  <Stack gap={8}>
    <Flex gap={12}>
      <Skeleton radius={"xl"} w={40} h={40} />
      <Skeleton w={60} h={12} />
    </Flex>
    <Stack gap={4}>
      <Skeleton w={"50%"} h={16} />
      <Skeleton w={"750%"} h={16} />
      <Skeleton w={"25%"} h={16} />
    </Stack>
  </Stack>
);
