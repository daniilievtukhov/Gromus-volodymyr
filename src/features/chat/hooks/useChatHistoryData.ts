import { useQuery } from "@tanstack/react-query";
import { orderBy } from "lodash-es";

import { ApiMessage } from "../../../requests/conversation/message";
import { useChatStore } from "../store";

export const useChatHistoryData = () => {
  return useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      const res = await ApiMessage.getLastMessages();

      if (res.length > 0) {
        useChatStore.setState({
          // chatId: res[0].conversationId,
          messages: orderBy(
            res.map(
              (m: { text: any; data: string; dataType: any; isCopilotMessage: any; date: any }) => {
                return {
                  message: m.text,
                  data: m.data ? JSON.parse(m.data) : null,
                  dataType: m.dataType,
                  isCopilot: m.isCopilotMessage,
                  date: m.date,
                };
              },
            ),
            "date",
            "asc",
          ),
        });
      }

      return res;
    },
  });
};
