import axios from "axios";

import { Links } from "../core/links";
import queryString from "query-string";
export namespace ApiTranscriptionHistory {
    const link = `${Links.api}/Transcription/History`;

    export interface IRequest {
        eventType: string
    }

    export interface IHistoryRequest {
        data_music_id: number
        date: Date,
        event: string 
        id: number 
        lang_generate: string 
        new_generate_text: string 
        url: string
    }

    export interface IResponse { 
        data_type: string
        event: "download_generate"
        history_requests: IHistoryRequest[]
        lang: any[];
    }

    export const get = async (params: IRequest) => {
        return (await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`)).data;
    };

}