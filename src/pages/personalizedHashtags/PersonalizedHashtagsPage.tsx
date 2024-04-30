import { Stack, Image, Text } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { AccentTitle } from "../../components/AccentTitle";
import { TopFiveHashtags } from "../../features/hashtags/TopFiveHashtags";
import { BalancedGroups } from "../../features/hashtags/BalancedGroups";
import { HashtagsModal } from "../../features/hashtags/HashtagsModal";
import { useHashtagFilters } from "./hooks/useHashtagFilters";
import { useHashtagsAnalytics } from "./hooks/useHashtagsAnalytics";
import { useState, useEffect } from "react";
import { useHashtags } from "../../features/hashtags/store/hashtags";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";
import { HashtagGroupsTitle } from "../../components/HashtagGroupsTitle";

export const PersonalizedHashtagsPage = () => {
  const { data: hashtagsFilter, isSuccess: isSuccessHashtagsFilter } = useHashtagFilters();
  const { data, isSuccess } = useHashtagsAnalytics({
    Country: hashtagsFilter?.country,
    Category: hashtagsFilter?.category,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topSoundHashtags, setTopSoundHashtags] = useState<ApiHashtagsAnalytics.ISoundHashtag[]>(
    [],
  );
  const [soundHashtagBalancedGroup, setSoundHashtagBalancedGroup] = useState<
    ApiHashtagsAnalytics.IHashtagBalance[]
  >([]);
  const [accountHashtagBalancedGroup, setAccountHashtagBalancedGroup] = useState<
    ApiHashtagsAnalytics.IHashtagBalance[]
  >([]);

  const store = useHashtags();

  useEffect(() => {
    //console.log(store);

    if (
      store.accountHashtagBalancedGroup &&
      store.soundHashtagBalancedGroup &&
      store.topSoundHashtags
    ) {
      // console.log(store);
      setTopSoundHashtags(store.topSoundHashtags);
      setSoundHashtagBalancedGroup(store.soundHashtagBalancedGroup);
      setAccountHashtagBalancedGroup(store.accountHashtagBalancedGroup);
    }
  }, [store]);

  useEffect(() => {
    if (
      data &&
      !store.accountHashtagBalancedGroup.length &&
      !store.topSoundHashtags.length &&
      !store.soundHashtagBalancedGroup.length
    ) {
      setTopSoundHashtags(data.topSoundHashtags);
      setSoundHashtagBalancedGroup(data.soundHashtagBalancedGroup);
      setAccountHashtagBalancedGroup(data.accountHashtagBalancedGroup);
    }
  }, [data]);

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
    //(store.accountHashtagBalancedGroup.length && store.topSoundHashtags.length && store.soundHashtagBalancedGroup.length) ||
    isSuccessHashtagsFilter &&
    isSuccess &&
    data && (
      <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
        {isModalOpen && <HashtagsModal onClose={closeModal} />}
        <Stack gap={12}>
          <HashtagGroupsTitle title="sounds" country={hashtagsFilter?.country} />
          <TopFiveHashtags topSoundHashtags={topSoundHashtags} />
          <HashtagGroupsTitle title="music niche" country={hashtagsFilter?.country} />
          <BalancedGroups
            accountHashtagBalancedGroup={soundHashtagBalancedGroup}
            openModal={openModal}
          />
          <HashtagGroupsTitle title="your niche" country={hashtagsFilter?.country} />

          <BalancedGroups
            accountHashtagBalancedGroup={accountHashtagBalancedGroup}
            openModal={openModal}
          />
        </Stack>
      </Stack>
    )
  );
};
