import { isNil } from "lodash-es";

export const percentFormat = (value: number) => {
  if (isNil(value) || isNaN(value)) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value / 100);
};
