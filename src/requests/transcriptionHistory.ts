import axios from "axios";

import { Links } from "../core/links";
import queryString from "query-string";
export namespace ApiTranscriptionHistory {
  const link = `${Links.api}/Transcription/History`;
  const linkByDetails = `${Links.api}/Transcription/Details`;

  export interface IRequestDetails {
    id: string | number;
  }

  export interface IRequestHistory {
    eventType: string;
    page: number;
  }

  export interface IHistoryRequest {
    data_music_id: number;
    date: Date;
    event: string;
    id: number;
    lang_generate: string;
    new_generate_text: string;
    url: string;
    title: string;
  }

  export interface IResponse {
    data_type: string;
    event: "download_generate";
    history_requests: IHistoryRequest[];
    lang: any[];
    pages: number;
    page_size: number;
  }

  export const get = async (params: IRequestHistory) => {
    return (await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`)).data;
  };

  export const getById = async (params: IRequestDetails) => {
    return await axios.get<IHistoryRequest>(`${linkByDetails}?${queryString.stringify(params)}`);
  };
}
