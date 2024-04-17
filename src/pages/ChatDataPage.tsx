import { Stack } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RisingSoundsTitle } from "../components/RisingSoundsTitle";
import { useChatStore } from "../features/chat/store";
import { RisingTable } from "../features/risingSounds";
import { ISoundData } from "../features/risingSounds/store";

export const ChatDataPage = () => {
  const { data } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

  const tableData = useMemo<ISoundData[]>(() => {
    return (
      data?.music.map((el) => ({
        ...el,
        id: el.musicId,
        author: el.authorNickname || el.authorUniqueId || el.creator || "",
        authorId: null,
      })) ?? []
    );
  }, [data?.music]);

  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
      <Stack gap={16}>
        <RisingSoundsTitle />
        {data && <RisingTable tableData={tableData} />}
      </Stack>
    </Stack>
  );
};
