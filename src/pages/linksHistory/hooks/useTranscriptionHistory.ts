import { useQuery } from "@tanstack/react-query";

import { ApiTranscriptionHistory } from "../../../requests/transcriptionHistory";

export const useTranscriptionHistory = () => {
  return useQuery({
      queryKey: ["transcriptionHistory"],
      queryFn: () => ApiTranscriptionHistory.get(),
    });
};
