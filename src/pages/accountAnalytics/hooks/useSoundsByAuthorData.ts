import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { ApiSounds } from "../../../requests/stats/sounds";
import { ApiSoundUsedByAuthor } from "../../../requests/stats/soundUsedByAuthor";

export const useSoundsByAuthorData = (authorId: number | string) => {
  const [page, setPage] = useState(1);
  const [take] = useState(20);

  const params = useMemo<ApiSounds.IRequest>(
    () => ({
      authorId,
      sorting: "rise",
      order: "desc",
      days: 7,

      skip: (page - 1) * take,
    }),
    [authorId, page, take],
  );

  return {
    query: useQuery({
      queryKey: ["sounds", params],
      queryFn: () => ApiSoundUsedByAuthor.get(params),
    }),
    page,
    setPage,
  };
};
