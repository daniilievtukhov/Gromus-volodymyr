import axios from "axios";

import { Links } from "../core/links";
import queryString from "query-string";

export namespace ApiTranscriptionGenerate {
    const link = `${Links.api}/Transcription/Generate`;
    const linkUpdate = `${Links.api}/Transcription/EditAiText`;
    export interface IRequest {
        Url: string,
        Language: string,
        EventType: string
    }

    export interface IRequestUpdate {
        id: number | string,
        language: string,
        text: string
    }

    export interface IResponse {
        id: string | number,
        data_type: string,
        event_type:"download_generate"
        url:string,
        data_music_url: string,
        transcription_text: string,
        title: string,
        language_original: string,
        new_generate_text: string,
        lang_generate: string  
    }
    
    export const post = async (params: IRequest) => {
        return (await axios.post<IResponse>(`${link}?${queryString.stringify(params)}`));
    };

    export const update = async (params: IRequestUpdate) => {
        return (await axios.post<IResponse>(`${linkUpdate}?${queryString.stringify(params)}`))
    }
}