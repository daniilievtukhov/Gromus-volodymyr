import { useQuery } from "@tanstack/react-query";

import { ApiTranscriptionHistory } from "../../../requests/transcriptionHistory";
import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import queryString from "query-string";

export const useTranscriptionHistory = () => {
  const [searchParams] = useSearchParams(); 
  const [page, setPage] = useState(1);
  const [take] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  const params = useMemo(
    () =>
      ({
        eventType: "download_generate"

      }) as ApiTranscriptionHistory.IRequest,
    [page, searchParams, take],
  );

  // .slice((page - 1) * take, page * take)
  return { 
    query: useQuery({
      queryKey: ["transcriptionHistory"],
      queryFn: () => ApiTranscriptionHistory.get(params).then(data => { 
        setTotalPages(Math.ceil(data.history_requests.length / take));
        return {...data, history_requests: data.history_requests} 
      }),
    }),
    totalPages,
    page,
    setPage
  }
};
