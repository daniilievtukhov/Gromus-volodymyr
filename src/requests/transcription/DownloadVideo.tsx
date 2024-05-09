import axios from "axios";
import { Links } from "../../core/links";
import queryString from "query-string";

export namespace ApiTranscriptionDownload {
  export const link = `${Links.api}/Transcription/DownloadVideo`;

  export interface IRequest {
    id: number | string;
  }

//   export interface IResponse {
//     id: string | number;
//     data_type: string;
//     event_type: "download_generate";
//     url: string;
//     data_music_url: string;
//     transcription_text: string;
//     title: string;
//     language_original: string;
//     new_generate_text: string;
//     lang_generate: string;
//   }

  export const getLink = async (params: IRequest) => {
    return await axios.get(`${link}?${queryString.stringify(params)}`)
  };
}
