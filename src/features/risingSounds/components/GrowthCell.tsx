import { Tooltip } from "@mantine/core";
import { isNumber } from "lodash-es";

export const GrowthCell = ({ value }: { value: number | null }) => {
  if (!isNumber(value) || isNaN(value)) return "-";

  if (value > 20) {
    return (
      <Tooltip label={"> Top 20% of video growth"}>
        <div>Trending 🔥🔥🔥🔥</div>
      </Tooltip>
    );
  }

  if (value > 10) {
    return (
      <Tooltip label={"> Top 10% of video growth"}>
        <div>Rising 🔥🔥🔥</div>
      </Tooltip>
    );
  }

  if (value > 5) {
    return (
      <Tooltip label={"> Top 5% of video growth"}>
        <div>Emerging 🔥🔥</div>
      </Tooltip>
    );
  }

  if (value > 1) {
    return (
      <Tooltip label={"> Top 1% of video growth"}>
        <div>Viral 🔥</div>
      </Tooltip>
    );
  }

  return "-";
};
