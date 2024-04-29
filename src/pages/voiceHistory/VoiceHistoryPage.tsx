import { Skeleton, Stack } from "@mantine/core";
import { useMemo } from "react";

import { AccentTitle } from "../../components/AccentTitle";
import { RisingDaily, RisingTable } from "../../features/risingSounds/index";
import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
import { ISoundData } from "../../features/risingSounds/store";
import { useSoundsData } from "../sounds/hooks/useSoundsData";
import { bulleted_list } from "../../assets/index";
import { microSvg } from "../../assets/index";

import { inspect } from "util";
import path from "path";
import { VoiceOperations } from "./components/VoiceOperations";
import { VoiceTable } from "./components/VoiceTable";

export const VoiceHistoryPage = () => {
  const {
    query: { data, isSuccess, isLoading },
    page,
    setPage,
  } = useSoundsData();

  // const tableData = useMemo<ISoundData[]>(() => {
  //   return (
  //     data?.music.map((el) => ({
  //       ...el,
  //       id: el.musicId,
  //       author: el.authorNickname || el.authorUniqueId || el.creator || "",
  //       authorId: el.authorIdLong,
  //     })) ?? []
  //   );
  // }, [data?.music]);

  const tableData = [
    {
      id: 1,
      social: {
        path: "https://tic-tok.com",
        title: "Tik-tok reels",
      },
      date: "19.04.2024",
      video: "https://video.com",
      inspect: "https://video.com",
    },

    {
      id: 2,
      social: {
        path: "https://tic-tok.com",
        title: "Tik-tok reels",
      },
      date: "20.04.2024",
      video: "https://video.com",
      inspect: "https://video.com",
    },

    {
      id: 3,
      social: {
        path: "https://tic-tok.com",
        title: "Tik-tok reels",
      },
      date: "21.04.2024",
      video: "https://video.com",
      inspect: "https://video.com",
    },

    {
      id: 4,
      social: {
        path: "https://youtube.com",
        title: "Youtube reels",
      },
      date: "22.04.2024",
      video: "https://video.com",
      inspect: "https://video.com",
    },

    {
      id: 5,
      social: {
        path: "https://youtube.com",
        title: "Youtube tube reels",
      },
      date: "23.04.2024",
      video: "https://video.com",
      inspect: "https://video.com",
    },
  ];

  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
      <Stack gap={16}>
        <AccentTitle image={microSvg}>
          <AccentTitle.Color>History</AccentTitle.Color> of voice scripts
        </AccentTitle>
        <VoiceOperations />
        {isLoading && (
          <Stack gap={8}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} h={60} />
            ))}
          </Stack>
        )}
        {isSuccess && (
          <Stack gap={8}>
            <VoiceTable tableData={tableData} />
            <RisingSoundsPagination page={page} setPage={setPage} total={data.totalRows} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
