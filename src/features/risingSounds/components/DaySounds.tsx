import { Group, ScrollArea, Skeleton, Stack } from "@mantine/core";
import { IconHeadphonesFilled } from "@tabler/icons-react";

import { AccentTitle } from "../../../components/AccentTitle";
import { useDaySoundsData } from "../../../pages/sounds/hooks/useDaySoundsData";
import { Sound } from "./Sound";

export const DaySounds = () => {
  const { data, isLoading, isSuccess } = useDaySoundsData();

  return (
    <Stack gap={16}>
      <AccentTitle icon={<IconHeadphonesFilled />}>
        Sounds <AccentTitle.Color>of the day</AccentTitle.Color>
      </AccentTitle>
      <ScrollArea mx={-32} type="never">
        <Group gap={10} wrap="nowrap" px={32}>
          {isLoading && [1, 2, 3, 4].map((el) => <Skeleton h={120} w={200} key={el} />)}
          {isSuccess && data.map((el) => <Sound key={el.musicId} data={el} />)}
        </Group>
      </ScrollArea>
    </Stack>
  );
};
