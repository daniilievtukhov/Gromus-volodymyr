import { useQuery } from "@tanstack/react-query";

import { ApiTranscriptionHistory } from "../../../requests/transcriptionHistory";
import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";

export const useTranscriptionHistory = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const params = useMemo(
    () =>
      ({
        eventType: "download_generate",
        page,
      } as ApiTranscriptionHistory.IRequestHistory),
    [searchParams, page, setPage],
  );

  return {
    query: useQuery({
      queryKey: ["transcriptionHistory", params],
      queryFn: () => ApiTranscriptionHistory.get(params),
    }),

    page,
    setPage,
  };
};
