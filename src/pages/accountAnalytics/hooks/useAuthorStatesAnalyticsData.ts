import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ApiAuthorStatesAnalytics } from "../../../requests/authorStates";

export const useAuthorStatesAnalyticsData = () => {
  const [author] = useState("missionaryjack");

  return {
    query: useQuery({
      queryKey: ["authorStatesAnalytics", author],
      queryFn: () => ApiAuthorStatesAnalytics.get({ uniqueId: author }),
    }),
  };
};
