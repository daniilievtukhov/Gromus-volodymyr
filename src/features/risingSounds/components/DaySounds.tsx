import { Flex, Group, ScrollArea, Skeleton, Stack } from "@mantine/core";
import { IconHeadphonesFilled, IconPlayerPlay } from "@tabler/icons-react";

import { AccentTitle } from "../../../components/AccentTitle";
import { useDaySoundsData } from "../../../pages/sounds/hooks/useDaySoundsData";
import { Sound } from "./Sound";
import { AnimatedButtonDark } from "../../../components/AnimatedButton";
import { useHowItWorkStore } from "../../greeting/store";
import { openVideoModalTutorial } from "../../../globalStore";

export const DaySounds = () => {
  const { data, isLoading, isSuccess } = useDaySoundsData();
  const clicked = useHowItWorkStore((state) => state.clicked);
  const handleHowItWorks = () => {
    useHowItWorkStore.setState({ clicked: true });
    openVideoModalTutorial("", "Rising Sounds for today");
  };
  return (
    <Stack gap={16}>
      <Flex justify="start" gap="md" align="center" wrap="wrap">
        <AccentTitle icon={<IconHeadphonesFilled />}>
          Sounds <AccentTitle.Color>of the day</AccentTitle.Color>
        </AccentTitle>
        <Flex align="center" justify="center" w="45%">
          {/*<AnimatedButtonDark
            clicked={clicked}
            onClick={handleHowItWorks}
            title="How it works"
            icon={<IconPlayerPlay size={10} />}
          /> */}
        </Flex>
      </Flex>
      <ScrollArea mx={-32} type="never">
        <Group gap={10} wrap="nowrap" px={32}>
          {isLoading && [1, 2, 3, 4].map((el) => <Skeleton h={120} w={200} key={el} />)}
          {isSuccess && data.map((el) => <Sound key={el.musicId} data={el} />)}
        </Group>
      </ScrollArea>
    </Stack>
  );
};
