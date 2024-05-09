import { Tooltip } from "@mantine/core";

export const GrowthCell = ({ value }: { value: string | undefined }) => {
  if (!value) return "-";
  switch (value.toLocaleLowerCase()) {
    case "viral":
      return (
        <Tooltip label={"> 5% daily rise from summ in location group"}>
          <div>Viral 🔥🔥🔥🔥</div>
        </Tooltip>
      );
    case "trending":
      return (
        <Tooltip label={"> 3% daily rise from summ in location group"}>
          <div>Trending 🔥🔥🔥</div>
        </Tooltip>
      );
    case "rising":
      return (
        <Tooltip label={"> 1% daily rise from summ in location group"}>
          <div>Rising 🔥🔥</div>
        </Tooltip>
      );
    case "emerging":
      return (
        <Tooltip label={"< 1% daily rise from summ in location group"}>
          <div>Emerging 🔥</div>
        </Tooltip>
      );
    default:
      return "-";
  }
};
