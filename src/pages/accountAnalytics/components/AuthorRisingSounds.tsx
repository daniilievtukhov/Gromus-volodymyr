import { Alert, Skeleton, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { memo, useMemo } from "react";

import { RisingSoundsTitle } from "../../../components/RisingSoundsTitle";
import { RisingTable } from "../../../features/risingSounds";
import { RisingSoundsPagination } from "../../../features/risingSounds/RisingSoundsPagination";
import { ISoundData } from "../../../features/risingSounds/store";
import { useSoundsByAuthorData } from "../hooks/useSoundsByAuthorData";

export const AuthorRisingSounds = memo(({ authorId }: { authorId: number | string }) => {
  const {
    query: { data, isSuccess, isLoading, isError },
    page,
    setPage,
  } = useSoundsByAuthorData(authorId);

  const tableData = useMemo<ISoundData[]>(() => {
    return (
      data?.sounds.map((el) => ({
        cover: el.cover,
        dailyRise: el.dailyRise,
        growth: 0,
        lastWeekViewStats: el.lastWeekViewStats,
        musicId: el.musicId,
        musicOriginal: el.musicOriginal,
        notAvailable: el.notAvailable,
        playUrl: el.url,
        reposts: el.reposts,
        shazamLink: el.recognitionLink,
        tikTokLink: el.link,
        title: el.title,
        topAudienceLocation: el.topAudienceLocation,
        id: el.musicId,
        author: el.authorNickname || el.authorUniqueId || el.creator || "",
        authorId: el.authorIdLong,
      })) ?? []
    );
  }, [data?.sounds]);

  return (
    <Stack gap={16}>
      <RisingSoundsTitle />
      {isLoading && (
        <Stack gap={8}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} h={60} />
          ))}
        </Stack>
      )}
      {isSuccess && tableData.length > 0 && (
        <Stack gap={8}>
          <RisingTable tableData={tableData} />
          <RisingSoundsPagination page={page} setPage={setPage} total={data.totalPages} />
        </Stack>
      )}

      {isSuccess && tableData.length === 0 && (
        <Alert variant="light" color="gray.5" icon={<IconInfoCircle />}>
          No data
        </Alert>
      )}

      {isError && (
        <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
          Something went wrong. We are working on getting this fixed as soon as we can.
        </Alert>
      )}
    </Stack>
  );
});
