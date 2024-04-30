import axios from "axios";

import { Links } from "../core/links";
import queryString from "query-string";

export namespace ApiTranscriptionGenerate {
    const link = `${Links.api}/Transcription/Generate`;

    export interface IRequest {
        Url: string,
        Language: string,
        EventType: string
    }

    export interface IResponse {
        data_type: string,
        event_type:"download_generate"
        url:string,
        data_music_url: string,
        transcription_text: string,
        title: string,
        language_original: string,
        new_generate_text: string   
    }
    
    export const post = async (params: IRequest) => {
        return (await axios.post<IResponse>(`${link}?${queryString.stringify(params)}`));
    };

}