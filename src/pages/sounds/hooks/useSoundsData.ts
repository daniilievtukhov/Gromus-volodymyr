import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ApiSounds } from "../../../requests/stats/sounds";

export const useSoundsData = () => {
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [take] = useState(20);

  const params = useMemo(
    () =>
      ({
        sorting: "rise",
        order: "desc",
        days: 7,
        ...queryString.parse(searchParams.toString(), { parseBooleans: true, parseNumbers: true }),
        skip: (page - 1) * take,
      }) as ApiSounds.IRequest,
    [page, searchParams, take],
  );

  return {
    query: useQuery({
      queryKey: ["sounds", params],
      queryFn: () => ApiSounds.get(params),
    }),
    page,
    setPage,
  };
};
