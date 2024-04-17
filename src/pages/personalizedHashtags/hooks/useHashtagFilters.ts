import { useQuery } from "@tanstack/react-query";

import { ApiHashtagFilters } from "../../../requests/hashtagFilters";

export const useHashtagFilters = () => {
  return useQuery({
    queryKey: ["personalHashtags"],
    queryFn: () => ApiHashtagFilters.get(),
  });
};
