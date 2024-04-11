import { Button, Group, Image, Stack, Text } from "@mantine/core";
import {
  IconBellRingingFilled,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconChartPieFilled,
  IconClockHour4Filled,
  IconMailFilled,
} from "@tabler/icons-react";

import { bell } from "../../../assets";
import { LockedCard } from "./LockedCard";

export const ScheduleActions = () => {
  return (
    <Stack gap={20}>
      <Group gap={16} wrap="nowrap">
        <Button leftSection={<IconMailFilled />} bg="dark.5">
          Send me to email
        </Button>
        <LockedCard label="Coming Soon (Notifications)">
          <Button leftSection={<IconBellRingingFilled />} bg="dark.5" disabled>
            Enable Browser Notification
          </Button>
          <Button leftSection={<IconBrandTelegram />} bg="dark.5" disabled>
            Remind in Telegram
          </Button>
          <Button leftSection={<IconBrandWhatsapp />} bg="dark.5" disabled>
            Remind in WhatsApp
          </Button>
        </LockedCard>
      </Group>

      <Group gap={16} align="stretch">
        <LockedCard label="Coming Soon (Statistics)">
          <Button leftSection={<IconClockHour4Filled />} bg="dark.5" disabled>
            Global Best Time to Post
          </Button>
          <Button leftSection={<IconChartPieFilled />} bg="dark.5" disabled>
            Total Engagement
          </Button>
        </LockedCard>

        <Group bg="dark.7" p={16} align="center">
          <Image src={bell} w={28} />
          <Text fz="xs" fw={600} c="white" maw={150}>
            Notify me when these features start working
          </Text>
          <Button bg="lime.4" c="black" size="compact-sm" fz={12} fw={700} px={20}>
            Notify me
          </Button>
        </Group>
      </Group>
    </Stack>
  );
};
