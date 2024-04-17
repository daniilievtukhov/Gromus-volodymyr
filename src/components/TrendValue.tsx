import { Flex, Stack, Text } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { isNumber } from "lodash-es";

import { formatShortNumber } from "../core/helpers/formatShortNumber";

interface IProps {
  current?: number | null;
  growth?: number | null;
}

export const TrendValue = ({ current, growth }: IProps) => {
  return (
    <Stack gap={6} justify="center" align="end">
      <Text fz={14} fw={600}>
        {formatShortNumber(current)}
      </Text>
      {isNumber(growth) && growth !== 0 && (
        <Flex gap={2} c={growth > 0 ? "#00E082" : "#FF355A"}>
          {growth > 0 ? <IconArrowUp size={20} /> : <IconArrowDown size={20} />}
          <Text fz={12} fw={600}>
            {formatShortNumber(growth)}
          </Text>
        </Flex>
      )}
    </Stack>
  );
};
