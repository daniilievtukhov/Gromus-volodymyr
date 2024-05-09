import axios from "axios";
import { Links } from "../core/links";

export namespace ApiTranscriptionEdit {
  const linkAIUpdate = `${Links.api}/Transcription/EditAiText`;
  const linkTrascriptionUpdate = `${Links.api}/Transcription/EditTranscription`;
  const linkRegenerateAIText = `${Links.api}/Transcription/RegerateAiText`;

  export interface IRequest {
    id: number | string;
    lang: string;
    text: string;
  }

  export interface IResponse {
    id: string | number;
    data_type: string;
    event_type: "download_generate";
    url: string;
    data_music_url: string;
    transcription_text: string;
    title: string;
    language_original: string;
    new_generate_text: string;
    lang_generate: string;
  }

  export const updateAIText = async (params: IRequest) => {
    return await axios.post<IResponse>(linkAIUpdate, params);
  };

  export const updateTranscriptionText = async (params: IRequest) => {
    return await axios.post<IResponse>(linkTrascriptionUpdate, params);
  };

  export const regenerateAIText = async (params: IRequest) => {
    return await axios.post<IResponse>(linkRegenerateAIText, params);
  };
}
