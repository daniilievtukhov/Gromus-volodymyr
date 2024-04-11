import { useQuery } from "@tanstack/react-query";

import { ApiAuthorAnalytics } from "../../../requests/authorAnalytics";

export const useAuthorAnalyticsData = (authorId?: number | string) => {
  return useQuery({
    queryKey: ["authorAnalytics", authorId],
    queryFn: () => ApiAuthorAnalytics.get({ authorId }),
    enabled: !!authorId,
  });
};
