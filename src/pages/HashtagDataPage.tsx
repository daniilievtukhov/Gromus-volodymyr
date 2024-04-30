import { Stack } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "../features/chat/store";

import { BalancedGroupsAI } from "../features/hashtags/BalancedGroupsAI";
import { ApiHashtagsAnalytics } from "../requests/hashtagsAnalytics";
import { HashtagGroupsTitle } from "../components/HashtagGroupsTitle";
import { HashtagsModal } from "../features/hashtags/HashtagsModal";

export const HashtagDataPage = () => {
  const { data } = useChatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

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

  const accountHashtagBalancedGroup = useMemo<ApiHashtagsAnalytics.IHashtagBalance[]>(() => {
    return (
      data?.accountHashtagBalancedGroup?.map((el) => ({
        ...el,
        id: uuidv4(),
      })) ?? []
    );
  }, [data?.accountHashtagBalancedGroup]);

  return (
    <Stack p={32} gap={128} bg="#0D0D0E" mih="100vh">
      <Stack gap={16}>
        {isModalOpen && <HashtagsModal onClose={closeModal} />}
        <HashtagGroupsTitle title="your niche" country={data?.filters.country} />
        {data && (
          <BalancedGroupsAI
            accountHashtagBalancedGroup={accountHashtagBalancedGroup}
            openModal={openModal}
          />
        )}
      </Stack>
    </Stack>
  );
};
