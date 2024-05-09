import { Skeleton, Stack } from "@mantine/core";

import { AccentTitle } from "../../components/AccentTitle";
import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
import { bulletSvg } from "../../assets/index";
import { LinksTable } from "./components/LinksTable";
import { LinkInsertion } from "./components/LinkInsertion";
import { useTranscriptionHistory } from "./hooks/useTranscriptionHistory";
import { ILinkData } from "./components/LinksTable";
import { useMemo } from "react";
import { format } from "date-fns";

export const LinksHistoryPage = () => {
  const {
    query: { data, isSuccess, isLoading },
    page,
    setPage,
  } = useTranscriptionHistory();

  console.log(data);

  const tableData = useMemo(() => {
    return data?.history_requests.map((el, index) => ({
      id: el.id,
      table_id: index + 1 + (page - 1) * data.page_size,
      date: format(new Date(el.date), "dd.MM.yyyy"),
      title: el.label,
      video: el.url,
    })) as ILinkData[];
  }, [data?.history_requests]);
  console.log(tableData);
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
            <RisingSoundsPagination page={page} setPage={setPage} total={data ? data.pages : 0} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
