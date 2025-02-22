import { useQuery } from "@tanstack/react-query";

import { ApiAuthorStatesAnalytics } from "../../../requests/authorStates";

export const useAuthorStatesAnalyticsData = (authorId: string | number) => {
  return {
    query: useQuery({
      queryKey: ["authorStatesAnalytics", authorId],
      queryFn: () => ApiAuthorStatesAnalytics.get({ authorId: authorId }),
    }),
  };
};
