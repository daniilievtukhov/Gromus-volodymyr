import { Stack } from "@mantine/core";
import { IconSparkles, IconHash } from "@tabler/icons-react";
import { AccentTitle } from "../components/AccentTitle";
import { TopFiveHashtags } from "../features/hashtags/TopFiveHashtags";
import { BalancedGroups } from "../features/hashtags/BalancedGroups";
export const PersonalizedHashtagsPage = () => {
  return (
    <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
      <Stack gap={28}>
        <AccentTitle icon={<IconSparkles />}>
          AI Recommendations <AccentTitle.Color>TOP 5 hashtags</AccentTitle.Color> for your sound{" "}
          <AccentTitle.Color>this month</AccentTitle.Color>
        </AccentTitle>
        <TopFiveHashtags />
        <AccentTitle icon={<IconHash />}>
          <AccentTitle.Color>Hashtags</AccentTitle.Color> balanced groups{" "}
          <AccentTitle.Color> for your sound </AccentTitle.Color>
          this month
        </AccentTitle>
        <BalancedGroups />
        <AccentTitle icon={<IconHash />}>
          <AccentTitle.Color>Hashtags</AccentTitle.Color> balanced groups{" "}
          <AccentTitle.Color> for your account </AccentTitle.Color>
          this month
        </AccentTitle>
        <BalancedGroups />
      </Stack>
    </Stack>
  );
};
