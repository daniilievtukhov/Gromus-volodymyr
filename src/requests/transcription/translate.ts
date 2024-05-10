import axios from "axios";
import { Links } from "../../core/links";
import queryString from "query-string";

export namespace ApiTranscriptionTranslate {
  export const link = `${Links.api}/Transcription/Translate`;

  export interface IRequest {
    id: number | string;
  }

  export interface IResponse {
    translation_text: string;
  }

  export const get = async (params: IRequest) => {
    return await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`)
  };
}
