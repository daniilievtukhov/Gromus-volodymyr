import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../globalStore";
import { useLayoutStore } from "../../../layoutStore";
import { ApiMessage } from "../../../requests/conversation/message";
import { ApiLLM } from "../../../requests/llm";
import { addMessage, useChatStore } from "../store";
import { useAIAuthorAnalyticStore } from "../../../pages/accountAnalytics/store/accountAnalytic";
// import { io } from "socket.io-client";
import axios from "axios";
const userRegion = navigator.language;
import { useHashtags } from "../../hashtags/store/hashtags";
import { setPosts } from "../store";

type Payload = Pick<ApiMessage.IGetLastMessagesRequest, "conversationId" | "text" | "date">;

const getUserInfo = async (link: string) => {
  return await axios.get(link, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("BEARER_TOKEN")}`,
    },
  });
};

function convertToHTMLList(text: string) {
  const freeText: string[] = [];
  const lines = text.split(/\r?\n/); // Split text into lines
  const listItems = lines.map((line, index) => {
    if (/^\d+\./.test(line)) {
      // Check if the line starts with a number followed by a dot
      const content = line.replace(/^\d+\.\s*(.*)$/, "$1"); // Extract the content after the number and dot
      return <li key={index}>{content}</li>; // Render the content as a list item
    } else if (/^\* /.test(line)) {
      // Check if the line starts with an asterisk
      const content = line.replace(/^\* (.+)$/, "$1"); // Extract the content after the asterisk
      return <li key={index}>{content}</li>; // Render the content as a list item
    } else {
      freeText.push(line);
      return null; // Skip lines that don't match the patterns
    }
  });
  return (
    <>
      <ul>{listItems}</ul>
      <p>{freeText}</p>
    </>
  ); // Render the list with the generated list items
}

export const useSendMessage = () => {
  const { userInfo } = useGlobalStore();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const chatStore = useChatStore();

  const handleButtonClick = async (
    link: string,
    message: {
      Data: any;
      DataType: any;
      Text: any;
      Actions: any[];
      ConversationId: any;
      Context: any;
    },
  ) => {
    const res = await getUserInfo(link);

    switch (message.DataType) {
      case "HashtagsPersonal":
      case "HashtagsGeneral":
        useChatStore.setState({
          data: res.data,
        });
        navigate("/ai-hashtags");

        break;

      case "TimePost":
        setPosts(res.data);
        navigate("/ai-calendar");
        break;

      case "SoundSearch":
        useChatStore.setState({
          data: res.data,
        });
        navigate("/ai-data");
        break;

      default:
    }
  };

  const defaultButtons = [
    {
      label: "Time to post",
      onClick: () => navigate("/time-to-post"),
    },
    {
      label: "Account analytics",
      onClick: () => navigate("/my-account-analytics"),
    },
    {
      label: "Rising Sounds",
      onClick: () => navigate("/rising-sounds"),
    },
    {
      label: "Hashtags",
      onClick: () => navigate("/hashtags"),
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: ({ conversationId, text }: Payload): Promise<ApiLLM.IResponse> => {
      useGlobalStore.setState((state: { limit: number }) => ({ ...state, limit: state.limit - 1 }));
      return ApiLLM.post({
        user_id: userInfo.id,
        conversation_id: conversationId,
        user_prompt: text,
        is_user_authorized_through_tiktok: false,
        user_region: userRegion,
      });
    },
    onMutate: (data: { text: string; date: string; conversationId: string }) => {
      setPrompt("");
      addMessage({
        isCopilot: false,
        message: data.text,
        date: data.date,
      });
      ApiMessage.fromUser({
        conversationId: data.conversationId,
        date: data.date,
        text: data.text,
      });
    },
    onSuccess: async (data: {
      Data: any;
      DataType: any;
      Text: any;
      Actions: any[];
      ConversationId: any;
      Context: any;
    }) => {
      const date = new Date().toISOString();

      const messageData = {
        isCopilot: true,
        data: data.Data,
        dataType: data.DataType,
        message: convertToHTMLList(data.Text),
        date,
      };

      if (!data.Actions) {
        addMessage({
          ...messageData,
          //buttons: defaultButtons,
        });
      } else {
        const buttons =
          data.Actions?.map((el) => ({
            label: el.label,
            onClick: () => {
              handleButtonClick(el.link, data);
            },
          })) ?? [];
        addMessage({
          ...messageData,
          buttons,
        });
      }

      if (
        data.DataType === "AuthorAnalytic" ||
        (data.DataType === "AuthorAnalyticPersonal" && data.Data)
      ) {
        const authorAnalyticItem = data.Data.find(
          (item: any) => item.DataType === "AuthorData",
        ).Data;
        const authorAuthorStatesAnalytic = data.Data.find(
          (item: any) => item.DataType === "AuthorStatesAnalytic",
        ).Data;
        const authorSongsUsedByAuthor = data.Data.find(
          (item: any) => item.DataType === "SongsUsedByAuthor",
        ).Data;

        const authorId = authorAnalyticItem.author.authorId || "";
        //(authorId);

        useAIAuthorAnalyticStore.setState(() => ({
          chatId: data.ConversationId,
          authorId: authorId,
          data: {
            authorData: { ...authorAnalyticItem },
            authorStatesAnalytic: { ...authorAuthorStatesAnalytic },
            songsUsedByAuthor: { ...authorSongsUsedByAuthor },
          },
        }));

        navigate("/ai-data-my-account-analytics");
      }

      if (data.DataType === "SoundSearch" && data.Data) {
        useChatStore.setState({
          data: data.Data,
        });
        navigate("/ai-data");
      }

      if (
        data.DataType === "HashtagsPersonal" ||
        (data.DataType === "HashtagsGeneral" && data.Data)
      ) {
        useChatStore.setState({
          data: data.Data,
        });
        navigate("/ai-hashtags");
      }

      ApiMessage.fromCopilot({
        conversationId: data.ConversationId,
        date,
        text: data.Text,
        data: JSON.stringify(data.Data),
        dataType: data.DataType,
        context: data.Context,
      });
    },
    onError: (error) => {
      const presetButtons = [
        {
          label: "US",
          onClick: () =>
            navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=US"),
        },
        {
          label: "UK",
          onClick: () =>
            navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=GB"),
        },
        {
          label: "MX",
          onClick: () =>
            navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=MX"),
        },
        {
          label: "UA",
          onClick: () =>
            navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=UA"),
        },
        {
          label: "World",
          onClick: () => navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20"),
        },
      ];

      if (isAxiosError(error)) {
        if (error.response?.status === 500 || error.response?.status === 520) {
          addMessage({
            date: new Date().toISOString(),
            isCopilot: true,
            message:
              "Please try another request, as I was unable to process this one. I'm working on your previous request and I will provide you with the answer shortly.",
            buttons: defaultButtons,
          });
        } else if (error.response?.statusText === "Unauthorized") {
          addMessage({
            date: new Date().toISOString(),
            isCopilot: true,
            message:
              "I noticed that you are not logged in or something happened with your authorization. In order to continue our work together , please try to log in one more time.",
            buttons: [{ label: "Sign In", onClick: () => navigate("/auth") }],
          });
        } else if (error.response?.status === 403) {
          addMessage({
            date: new Date().toISOString(),
            isCopilot: true,
            message: `You've reached the limit of interactions available under your current monthly subscription. It's been a pleasure to communicate and collaborate with you! I'll keep an eye on your music and account. If you'd like to resume immediately, consider upgrading your subscription tier. Otherwise, we can pick things up again at the beginning of next month.`,
            buttons: [
              ...presetButtons,
              {
                label: "Switch to Menu",
                onClick: () => useLayoutStore.setState({ chatOpened: false, navbarOpened: true }),
              },
            ],
          });
        } else {
          addMessage({
            date: new Date().toISOString(),
            isCopilot: true,
            message: "Please try another request, as I was unable to process this one.",
            buttons: defaultButtons,
          });
        }

        return;
      }
    },
  });

  return {
    send: (p: string) => {
      const prompt = p.trim();
      if (prompt) {
        mutate({
          conversationId: useChatStore.getState().chatId,
          date: new Date().toISOString(),
          text: prompt,
        });
      }
    },
    isPending,
    prompt,
    setPrompt,
  };
};
