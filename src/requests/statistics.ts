import axios from "axios";

import { Links } from "../core/links";

export namespace ApiStatistics {
  const link = `${Links.api}/Statistics/PlayUrlValidator`;

  export type IPlayRequest = {
    musicId: string;
    url: string;
  };

  export const playUrlValidator = (data: IPlayRequest) => {
    return axios.post(link, data);
  };
}
