import { create } from "zustand";

import { ApiTranscriptionGenerate } from "../../../requests/transcriptionGenerate";

const initial: ApiTranscriptionGenerate.IResponse = {
    ai_hashtag: "",
    ai_title: "",
    data_type: "",
    lang_generate: "",
    data_music_url: "",
    duration_video: 0,
    event_type: "download_generate",
    id: "",
    url:"",
    transcription_text: "",
    title: "",
    language_original: "",
    new_generate_text: "",
    original_hashtags: ""
}

export const useScriptVideoStore = create<ApiTranscriptionGenerate.IResponse>(() => ({
    ...initial
}));

export const clearScriptVideoStore = useScriptVideoStore.setState((set) => ({
    ...initial
}));