import axios from "axios";
import { Links } from "../../core/links";
import queryString from "query-string";

export namespace ApiTranscriptionDownload {
  export const link = `${Links.api}/Transcription/DownloadVideo`;

  export interface IRequest {
    id: number | string;
  }

  export interface IResponse {
    download_url: "download_generate";
  }

  export const getLink = async (params: IRequest) => {
    return await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`)
  };
}
