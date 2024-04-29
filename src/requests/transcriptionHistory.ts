import axios from "axios";

import { Links } from "../core/links";

export namespace ApiTranscriptionHistory {
    const link = `${Links.api}/Transcription/History`;

    export const get = async () => {
        return (await axios.get(`${link}`));
    };
}