import { Badge, Group, Space } from "@mantine/core";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { ApiSounds } from "../../requests/stats/sounds";
import { Message, StyledButton } from "./components/Message";
import { ApiSchedule } from "../../requests/schedule";
import { Presets } from "../presets";

type IState = {
  chatId: string;
  messages: IMessage[];
  data?: ApiSounds.IResponse | null;
};

export interface IMessage {
  message: ReactNode;
  messageId: string | number;
  isCopilot: boolean;
  dataType?: string | null;
  data?: ApiSounds.IResponse;
  date: string;
  buttons?: {
    link?: string;
    label: string;
    onClick?: () => void;
  }[];
}

export const usePostsStore = create<ApiSchedule.IResponse>(() => ({
  categoryId: 0,
  country: "",
  daysStats: [],
  followers: 0,
}));

export const useChatStore = create<IState>(() => ({
  chatId: uuidv4(),
  messages: [
    {
      isCopilot: true,
      date: new Date().toISOString(),
      messageId: "",
      message: (
        <>
          <Message.Text>Hi, I’m G:</Message.Text>
          <Group gap="xs">
            <Message.Text>Your Personal</Message.Text>
            <Badge color="lime.4" autoContrast>
              AI Assistant Beta
            </Badge>
            <Message.Text>
              I'm constantly evolving and introducing new features. At the moment, I analyze your
              <ul>
                <li> account</li>
                <li> competitors</li>
                <li> listen to your sounds</li>
                <li> watch your videos</li>
                <li> analyze all global viral content</li>
                <li> and train to provide the best personalized recommendations</li>
              </ul>
              Just ask me:
              <ul>
                <li>Show Top sounds in the USA with #dance</li>
                <li>Show best sounds in the UA with #dance duration 15 sec</li>
                <li>
                  Analyze account @creatorname or Analyze account
                  https://www.tiktok.com/@creatorname
                </li>
                <li>Analyze my account</li>
                <li>What is the best time for posting in category music</li>
                <li>Propose top hashtags in the Germany</li>
              </ul>
            </Message.Text>
          </Group>
        </>
      ),
    },
  ],
}));

export const setPosts = (posts: ApiSchedule.IResponse) => {
  usePostsStore.setState((prev: ApiSchedule.IResponse) => ({ ...prev, ...posts }));
};

export const addMessage = (message: IMessage) => {
  useChatStore.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
};

export const clearChat = () => {
  useChatStore.setState({
    chatId: uuidv4(),
    messages: [],
  });
};

export const useOriginAuthorIdStore = create(() => {
  originAuthorId: "";
});
