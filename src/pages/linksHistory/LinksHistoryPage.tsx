import { Skeleton, Stack } from "@mantine/core";

import { AccentTitle } from "../../components/AccentTitle";
import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
import { useSoundsData } from "../sounds/hooks/useSoundsData";
import { bulletSvg } from "../../assets/index";
import { LinksTable } from "./components/LinksTable";
import { LinkInsertion } from "./components/LinkInsertion";
import { useTranscriptionHistory } from "./hooks/useTranscriptionHistory";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { Form } from "@mantine/form";



export const LinksHistoryPage = () => {
  const {
    query: { data, isSuccess, isLoading },
    page,
    totalPages,
    setPage,
  } = useTranscriptionHistory();

  const tableData = useMemo(() => {
    return (
      data?.history_requests.map((el) => ({
        ...el,
        id: el.id,
        date: format(new Date(el.date), "dd.MM.yyyy"),
        video: el.url,
        inspect: "https://video.com"
      })) ?? []
    );
  }, [data?.history_requests]);

  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
      <Stack gap={16}>
        <AccentTitle image={bulletSvg}>
          <AccentTitle.Color>History</AccentTitle.Color> of video scripts
        </AccentTitle>
        <LinkInsertion />
        {isLoading && (
          <Stack gap={8}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} h={60} />
            ))}
          </Stack>
        )}
        {isSuccess && (
          <Stack gap={8}>
            <LinksTable tableData={tableData} />
            <RisingSoundsPagination page={page} setPage={setPage} total={totalPages} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
