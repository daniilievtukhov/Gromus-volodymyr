import { useQuery } from "@tanstack/react-query";

import { ApiTranscriptionHistory } from "../../../requests/transcriptionHistory";

export const useTranscriptionHistory = (id: string | number) => {
  return useQuery({
      queryKey: ["transcriptionHistory", id],
      queryFn: () => ApiTranscriptionHistory.getById({id: id}),
    })
};
