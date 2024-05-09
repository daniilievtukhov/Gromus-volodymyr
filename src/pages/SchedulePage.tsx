import { Flex, Stack, Text } from "@mantine/core";
import { IconPlayerPlay, IconSparkles } from "@tabler/icons-react";

import { AccentTitle } from "../components/AccentTitle";
import { Calendar, ScheduleActions } from "../features/schedule";
import { AnimatedButtonDark } from "../components/AnimatedButton";
import { useHowItWorkStore } from "../features/greeting/store";
import { openVideoModalTutorial } from "../globalStore";

export const SchedulePage = () => {
  const clicked = useHowItWorkStore((state) => state.clicked);
  const handleHowItWorks = () => {
    useHowItWorkStore.setState({ clicked: true });
    openVideoModalTutorial(
      "https://youtube.com/shorts/Sh7CUYq0cqQ",
      "Personalized Best Time & Day to Post",
    );
  };
  return (
    <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
      <Stack gap={28}>
        <Flex justify="start" gap="md" align="center" wrap="wrap">
          <AccentTitle icon={<IconSparkles />}>
            AI Recommendations on times and days for posting sounds in{" "}
            <AccentTitle.Color>this week</AccentTitle.Color> in{" "}
            <AccentTitle.Color>your country</AccentTitle.Color>
          </AccentTitle>
          <Flex align="center" justify="center">
            <AnimatedButtonDark
              clicked={clicked}
              onClick={handleHowItWorks}
              title="How it works"
              icon={<IconPlayerPlay size={10} />}
            />
          </Flex>
        </Flex>
        <Text size="lg" fw={500} c="white">
          I have analyzed your account and created a personalized schedule for your posts This
          recommendation is built on the analytics of your account, competitors, audience, and the
          content that is released in the country associated with your account.
        </Text>

        <Calendar />
      </Stack>

      <ScheduleActions />
    </Stack>
  );
};
