import { useQuery } from "@tanstack/react-query";
import { ApiHashtagsAnalytics } from "../../../requests/hashtagsAnalytics";

export const useHashtagsAnalyticsData = (params: {
  country: string | undefined;
  category: number | undefined;
}) => {
  return useQuery({
    queryKey: ["hashtagsAnalytics", params],
    queryFn: () => ApiHashtagsAnalytics.get(params),
  });
};
