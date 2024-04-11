import { isNil, round } from "lodash-es";

export const formatShortNumber = (value: number | undefined | null) => {
  if (isNil(value) || isNaN(value)) return "-";

  if (Math.abs(value) >= Math.pow(10, 18)) return round(value / Math.pow(10, 18), 2) + "E";
  if (Math.abs(value) >= Math.pow(10, 15)) return round(value / Math.pow(10, 15), 2) + "P";
  if (Math.abs(value) >= Math.pow(10, 12)) return round(value / Math.pow(10, 12), 2) + "T";
  if (Math.abs(value) >= Math.pow(10, 9)) return round(value / Math.pow(10, 9), 2) + "G";
  if (Math.abs(value) >= Math.pow(10, 6)) return round(value / Math.pow(10, 6), 2) + "M";
  if (Math.abs(value) >= Math.pow(10, 3)) return round(value / Math.pow(10, 3), 2) + "k";

  return round(value, 2);
};
