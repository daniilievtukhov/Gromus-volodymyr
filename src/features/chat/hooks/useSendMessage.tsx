import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalStore } from "../../../globalStore";
import { useLayoutStore } from "../../../layoutStore";
import { ApiMessage } from "../../../requests/conversation/message";
import { ApiLLM } from "../../../requests/llm";
import { addMessage,  useChatStore } from "../store";
import { useAIAuthorAnalyticStore } from "../../../pages/accountAnalytics/store/accountAnalytic";

import { redirect } from "react-router-dom";

const userRegion = navigator.language;

type Payload = Pick<ApiMessage.IGetLastMessagesRequest, "conversationId" | "text" | "date">;

export const useSendMessage = () => {
  const { userInfo } = useGlobalStore();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: ({ conversationId, text }: Payload): Promise<ApiLLM.IResponse> => {
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
      addMessage({
        isCopilot: true,
        data: data.Data,
        dataType: data.DataType,
        message: data.Text,
        date,
        buttons: data.Actions?.map((el) => ({ label: el.label, link: el.link })) ?? [],
      });

      if (data.DataType === "AuthorAnalytic" && data.Data) {
        
        const authorAnalyticItem = data.Data.find((item: any) => item.DataType === "AuthorData").Data;
        const authorAuthorStatesAnalytic = data.Data.find((item: any) => item.DataType === "AuthorStatesAnalytic").Data;
        const authorSongsUsedByAuthor = data.Data.find((item: any) => item.DataType === "SongsUsedByAuthor").Data;
      
        const authorId = authorAnalyticItem?.author?.authorId || "";
        // console.log(authorAnalyticItem);
        // console.log(authorAuthorStatesAnalytic);
        // console.log(authorSongsUsedByAuthor);

        useAIAuthorAnalyticStore.setState(() => ({
          chatId: data.ConversationId,
          authorId: authorId,
          data: {
            authorData: {...authorAnalyticItem},
            authorStatesAnalytic: {...authorAuthorStatesAnalytic},
            songsUsedByAuthor: {...authorSongsUsedByAuthor}
          } 
        }));
        
        navigate("/ai-data-my-account-analytics");
      }

      if (data.DataType === "SoundSearch" && data.Data) {
        useChatStore.setState({
          data: data.Data,
        });
        navigate("/ai-data");
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
        if (error.status === 500) {
          addMessage({
            date: new Date().toISOString(),
            isCopilot: true,
            message:
              "Please try another request, as I was unable to process this one. I'm working on your previous request and I will provide you with the answer shortly.",
            buttons: [
                {
                  label: "Time to post",
                  onClick: () => navigate("/time-to-post"),
                },
                {
                  label: " Account analytics",
                  onClick: () => navigate("/my-account-analytics"),
                },
                {
                  label: "Hashtags",
                  onClick: () => navigate("/hashtags"),
                },
              ],
          });
        }
        if (error.status === 401) {
          addMessage({
            date: new Date().toISOString(),
            isCopilot: true,
            message:
              "I noticed that you are not logged in or something happened with your authorization. In order to continue our work together , please try to log in one more time.",
            buttons: [{ label: "Sign In", onClick: () => navigate("/auth") }],
          });
        }
        if (error.status === 403) {
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
        }

        addMessage({
          date: new Date().toISOString(),
          isCopilot: true,
          message: "Please try another request, as I was unable to process this one.",
          buttons: [
            {
              label: "Time to post",
              onClick: () => navigate("/time-to-post"),
            },
            {
              label: " Account analytics",
              onClick: () => navigate("/my-account-analytics"),
            },
            {
              label: "Hashtags",
              onClick: () => navigate("/hashtags"),
            },
          ],
        });

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
