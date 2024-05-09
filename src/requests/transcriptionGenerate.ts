import axios from "axios";

import { Links } from "../core/links";
import queryString from "query-string";

export namespace ApiTranscriptionGenerate {
  const link = `${Links.api}/Transcription/Generate`;
  const linkUpdate = `${Links.api}/Transcription/EditAiText`;
  export interface IRequest {
    url: string;
    language: string;
    eventType: string;
  }

  export interface IRequestUpdate {
    id: number | string;
    language: string;
    text: string;
  }

  export interface IResponse {
    ai_hashtag: string;
    ai_title: string;
    data_type: string;
    download_url: string;
    duration_video: number;
    event_type: "download_generate";
    original_hashtags: string;
    id: string | number;
    url: string;
    transcription_text: string;
    title: string;
    language_original: string;
    new_generate_text: string;
    lang_generate: string;
  }

  export const post = async (params: IRequest) => {
    return await axios.post<IResponse>(link, params);
  };

  export const update = async (params: IRequestUpdate) => {
    return await axios.post<IResponse>(linkUpdate, params);
  };
}
