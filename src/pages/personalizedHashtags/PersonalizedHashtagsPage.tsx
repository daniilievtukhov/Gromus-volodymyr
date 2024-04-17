import { Stack, Image } from "@mantine/core";
import { IconSparkles, IconHash } from "@tabler/icons-react";
import { AccentTitle } from "../../components/AccentTitle";
import { TopFiveHashtags } from "../../features/hashtags/TopFiveHashtags";
import { BalancedGroups } from "../../features/hashtags/BalancedGroups";
import { useHashtagFilters } from "./hooks/useHashtagFilters";
import { useHashtagsAnalytics } from "./hooks/useHashtagsAnalytics";
import { hashtagSvg } from "../../assets";

export const PersonalizedHashtagsPage = () => {
  const { data: hashtagsFilter, isSuccess: isSuccessHashtagsFilter } = useHashtagFilters();
  const { data, isSuccess } = useHashtagsAnalytics({
    Country: hashtagsFilter?.country,
    Category: hashtagsFilter?.category,
  });

  return (
    isSuccessHashtagsFilter &&
    isSuccess &&
    data && (
      <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
        <Stack gap={12}>
          <AccentTitle icon={<IconSparkles />}>
            AI Recommendations <AccentTitle.Color>TOP 5 hashtags</AccentTitle.Color> for your sound{" "}
            <AccentTitle.Color>this month</AccentTitle.Color>
          </AccentTitle>
          <TopFiveHashtags topSoundHashtags={data.topSoundHashtags} />
          <AccentTitle icon={<Image w={24} src={hashtagSvg} />}>
            <AccentTitle.Color>Hashtags</AccentTitle.Color> balanced groups{" "}
            <AccentTitle.Color> for your sound </AccentTitle.Color>
            this month
          </AccentTitle>
          <BalancedGroups accountHashtagBalancedGroup={data.soundHashtagBalancedGroup} />
          <AccentTitle icon={<Image w={24} src={hashtagSvg} />}>
            <AccentTitle.Color>Hashtags</AccentTitle.Color> balanced groups{" "}
            <AccentTitle.Color> for your account </AccentTitle.Color>
            this month
          </AccentTitle>
          <BalancedGroups accountHashtagBalancedGroup={data.accountHashtagBalancedGroup} />
        </Stack>
      </Stack>
    )
  );
};
