import { Stack, Image, Text } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { AccentTitle } from "../../components/AccentTitle";
import { TopFiveHashtags } from "../../features/hashtags/TopFiveHashtags";
import { BalancedGroups } from "../../features/hashtags/BalancedGroups";
import { HashtagsModal } from "../../features/hashtags/HashtagsModal";
import { useHashtagFilters } from "./hooks/useHashtagFilters";
import { useHashtagsAnalytics } from "./hooks/useHashtagsAnalytics";
import { hashtagSvg } from "../../assets";
import { useState, useEffect } from "react";

export const PersonalizedHashtagsPage = () => {
  const { data: hashtagsFilter, isSuccess: isSuccessHashtagsFilter } = useHashtagFilters();
  const { data, isSuccess } = useHashtagsAnalytics({
    Country: hashtagsFilter?.country,
    Category: hashtagsFilter?.category,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    isSuccessHashtagsFilter &&
    isSuccess &&
    data && (
      <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
        {isModalOpen && <HashtagsModal onClose={closeModal} />}
        <Stack gap={12}>
          <AccentTitle icon={<IconSparkles />}>
            AI Recommendations <AccentTitle.Color>TOP 5 hashtags</AccentTitle.Color> for your sound{" "}
            <AccentTitle.Color>this week</AccentTitle.Color>
          </AccentTitle>
          <TopFiveHashtags topSoundHashtags={data.topSoundHashtags} />
          <AccentTitle icon={<Image w={24} src={hashtagSvg} />}>
            <AccentTitle.Color>Hashtag</AccentTitle.Color> sets this week{" "}
            <Text size="lg" fw={500} c="white" ff="mono">
              Use a set of recommended hashtags to cast a wider net across diverse audiences and
              trends
            </Text>
          </AccentTitle>
          <BalancedGroups
            accountHashtagBalancedGroup={data.soundHashtagBalancedGroup}
            openModal={openModal}
          />
          <AccentTitle icon={<Image w={24} src={hashtagSvg} />}>
            <AccentTitle.Color>Hashtags</AccentTitle.Color> for your account this week{" "}
            <Text size="lg" fw={500} c="white" ff="mono">
              Use these hashtags picked for your account (based on category, and country)
            </Text>
          </AccentTitle>

          <BalancedGroups
            accountHashtagBalancedGroup={data.accountHashtagBalancedGroup}
            openModal={openModal}
          />
        </Stack>
      </Stack>
    )
  );
};
