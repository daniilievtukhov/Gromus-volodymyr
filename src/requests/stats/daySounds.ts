import axios from "axios";

import { Links } from "../../core/links";

export namespace ApiDaySounds {
  const link = `${Links.api}/statistics/SoundsOfTheDay`;

  export type IRequest = {};

  export type IResponse = IMusic[];

  export interface IMusic {
    musicId: string;
    playUrl: string;
    title: string;
    creator: string;
    musicOriginal: boolean;
    cover: null | string;
    updateDate: string;
    shazamLink?: string;
    tikTokLink?: string;
  }

  export const get = async (params: IRequest) => {
    const res = await axios.get<IResponse>(`${link}`);

    return res.data;
  };
}
