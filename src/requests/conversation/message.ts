import axios from "axios";

import { Links } from "../../core/links";

export namespace ApiMessage {
  const link = `${Links.api}/Conversation`;

  export interface IGetLastMessagesRequest {
    conversationId: string;
    conversationName?: string;
    date: string;
    text: string;
    data?: string | null;
    dataType?: string;
    context?: unknown;
  }

  export type IGetLastMessagesResponse = ISavedMessage[];

  export interface ISavedMessage {
    id: string;
    conversationId: string;
    isCopilotMessage: boolean;
    date: string;
    text: string;
    data: string | null;
    dataType: null | string;
    raiting: number;
    context: null;
  }

  export const getLastMessages = async () => {
    const res = await axios.get(`${link}/GetLastMessages`);

    return res.data;
  };

  export const fromUser = async (params: IGetLastMessagesRequest) => {
    const res = await axios.post(`${link}/SaveUserMessage`, params);

    return res.data;
  };

  export const fromCopilot = async (params: IGetLastMessagesRequest) => {
    const res = await axios.post(`${link}/SaveCopilotMessage`, params);

    return res.data;
  };

  export const getLimit = async () => {
    const res = await axios.get<number>(`${link}/GetLimit`);

    return res.data;
  };
}
