import { isNumber } from "lodash-es";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const isNumberValue = (value: unknown): value is number => {
  return isNumber(value) && !isNaN(value);
};

export const useNumberQueryParam = (paramName: "authorId") => {
  const { [paramName]: value } = useParams();

  return useMemo(() => {
    const id = parseFloat(value || "");

    return isNumberValue(id) ? id : null;
  }, [value]);
};
