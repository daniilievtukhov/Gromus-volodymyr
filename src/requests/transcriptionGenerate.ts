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

    export const post = async (params: IRequest) => {
        return (await axios.post(`${link}?${queryString.stringify(params)}`));
    };

}