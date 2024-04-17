import { useQuery } from "@tanstack/react-query";
import { orderBy } from "lodash-es";

import { ApiMessage } from "../../../requests/conversation/message";
import { useChatStore } from "../store";

export const useChatHistoryData = () => {
  return useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      const res = await ApiMessage.getLastMessages();

      return res;
    },
  });
};
