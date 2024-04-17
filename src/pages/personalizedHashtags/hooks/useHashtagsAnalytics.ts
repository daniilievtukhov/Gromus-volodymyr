import { useQuery } from "@tanstack/react-query";
import { ApiHashtagsAnalytics } from "../../../requests/hashtagsAnalytics";

export const useHashtagsAnalytics = ( params: {Country: string | undefined, Category: number | undefined}) => {
  return useQuery({
    queryKey: ["hashtagsAnalytics", params],
    queryFn: () => ApiHashtagsAnalytics.get(params),
  });
};
