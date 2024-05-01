import { create } from "zustand";

import { ApiTranscriptionGenerate } from "../../../requests/transcriptionGenerate";

const initial: ApiTranscriptionGenerate.IResponse = {
    id: "",
    data_type: "",
    event_type: "download_generate",
    url:"",
    data_music_url: "",
    transcription_text: "",
    title: "",
    language_original: "",
    new_generate_text: "",
}

export const useScriptVideoStore = create<ApiTranscriptionGenerate.IResponse>(() => ({
    ...initial
}));

export const clearScriptVideoStore = useScriptVideoStore.setState((set) => ({
    ...initial
}));