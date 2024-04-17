import axios from "axios";
import queryString from "query-string";

import { Links } from "../core/links";

export namespace ApiSoundVideos {
  const link = `${Links.api}/Statistics/SoundVideosExternal`;

  export type IRequest = string;

  export type IResponse = IVideo[];

  export type IVideo = {
    videoId: string;
    musicId: null;
    authorId: string;
    authorName: string;
    user: string;
    videoCreateTime: string;
    playCount: number;
    likes: number;
    commentsCount: number;
    collectCount: number;
    cover: string;
    shares: number;
    videoTitle: string;
    locationCreated: string;
    videoUrl: string;
    inDatabase: boolean;
    isAd: boolean;
  };

  export const get = async (musicId: IRequest) => {
    return (await axios.get<IResponse>(`${link}?${queryString.stringify({ musicId })}`)).data;
  };
}
