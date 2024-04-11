import { useQuery } from "@tanstack/react-query";

import { ApiDaySounds } from "../../../requests/stats/daySounds";

export const useDaySoundsData = () => {
  return useQuery({
    queryKey: ["daySounds"],
    queryFn: () => ApiDaySounds.get({}),
  });
};
