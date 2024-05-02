import { useQuery } from "@tanstack/react-query";
import { ApiTranscriptionHistory } from "../../../requests/transcriptionHistory";

export const useVideoToScriptData = (id: number | string) => {
  return useQuery({
      queryKey: ["sounds"],
      queryFn: () => ApiTranscriptionHistory.getById({id: id})
    })
};
