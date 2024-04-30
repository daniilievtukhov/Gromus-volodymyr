import { Badge, Group } from "@mantine/core";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { create, createStore } from "zustand";

import { ApiSounds } from "../../requests/stats/sounds";
import { Message } from "./components/Message";

import { ApiSchedule } from "../../requests/schedule";
import { Url } from "url";

type IState = {
  chatId: string;
  messages: IMessage[];
  data?: ApiSounds.IResponse | null;
};

export interface IMessage {
  message: ReactNode;
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
      message: (
        <>
          <Message.Text>Hi, I’m GI:</Message.Text>
          <Group gap="xs">
            <Message.Text>Your Personal</Message.Text>
            <Badge color="lime.4" autoContrast>
              AI Assistant Beta
            </Badge>
            <Message.Text>
              I'm constantly evolving and introducing new features. At the moment, you're welcome to
              inquire about:
              <ul>
                <li>Rising sounds across any country in the world or check out global hits</li>
                <li>Optimal posting times for music content (TikTok authorization is needed)</li>
                <li>
                  Insights and analytics for your profile or any other content creator's account
                </li>
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
