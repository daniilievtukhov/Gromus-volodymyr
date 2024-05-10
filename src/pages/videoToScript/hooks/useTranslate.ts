import { useQuery } from "@tanstack/react-query";
import { ApiTranscriptionTranslate } from "../../../requests/transcription/translate";

export const useTranscriptionTranslate = (id: number | string) => {
  return useQuery({
      queryKey: ["translate", id],
      queryFn: () => ApiTranscriptionTranslate.get({ id })
    })
};
