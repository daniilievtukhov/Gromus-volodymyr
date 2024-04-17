import axios from "axios";
import queryString from "query-string";

import { Links } from "../core/links";

export namespace ApiHashtagsAnalytics {
  const link = `${Links.api}/Statistics/HashtagsAnalytics`;

  export interface IRequest {
    Country: string | undefined,
    Category: number | undefined
  }

  export interface IResponse {
    topSoundHashtags: ISoundHashtag[],
    soundHashtagBalancedGroup: IHashtagBalance[],
    accountHashtagBalancedGroup: IHashtagBalance[]
  }

  export interface ISoundHashtag {
    hashtag: string,
    views: number,
    dailyGrowth: number,
    posts: number,
    status: string,
    probableNextWeekTrend: boolean,
    link: string
  }

  export interface IHashtagBalance {
    groupName: string,
    hahtags: string[]
  }

  export const get = async (params:IRequest) => {
    if(params.Category && params.Country)
      return (await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`)).data;
  };
}
