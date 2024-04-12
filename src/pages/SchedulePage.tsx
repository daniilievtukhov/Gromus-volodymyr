import { Stack, Text } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

import { AccentTitle } from "../components/AccentTitle";
import { Calendar, ScheduleActions } from "../features/schedule";

export const SchedulePage = () => {
  return (
    <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
      <Stack gap={28}>
        <AccentTitle icon={<IconSparkles />}>
          AI recommendations on the best time and day to post content on TikTok{" "}
          <AccentTitle.Color>this week</AccentTitle.Color> in{" "}
          <AccentTitle.Color>(in the chosen country)</AccentTitle.Color>
        </AccentTitle>
        <Text size="lg" fw={500} c="white" ff="mono">
          This recommendation is built on the analytics of your account, competitors, audience, and
          the content that is released in the country associated with your account. If you want to
          change the country of distribution for your content, you will receive personalized data
          for any country.
        </Text>
        <Text size="lg" fw={500} c="white" ff="mono">
          The recommended time for postings is updated weekly.
        </Text>
        <Calendar />
      </Stack>

      <ScheduleActions />
    </Stack>
  );
};
