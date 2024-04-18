import axios from "axios";

import { Links } from "../core/links";
import { ApiSounds } from "./stats/sounds";
import { ApiAuthorAnalytics } from "./authorAnalytics";

export namespace ApiLLM {
  export const link = `${Links.llm}/v2/copilot/prompt`;
  interface IRequest {
    user_id: string;
    conversation_id: string;
    user_prompt: string;
    is_user_authorized_through_tiktok: boolean;
    user_tiktok_nickname?: string;
    user_region: string;
  }

  export interface IResponse {
    ConversationId: string;
    ConversationName: string;
    Date: null;
    Text: string;
    Data: ApiAuthorAnalytics.IResponse;
    DataType: string;
    Context: unknown;
    daysStats?: {
      dayOfWeek: number;
      dayName: string;
      hoursStats: { hour: number; percent: number }[];
    }[];
    Actions: Array<{ label?: string; link?: string }>;
  }

  export const post = async (params: IRequest) => {
    const res = await axios.post<IResponse>(link, params);

    return res.data;
  };
}
