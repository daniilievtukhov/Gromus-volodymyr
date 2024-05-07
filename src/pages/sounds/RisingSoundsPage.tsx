import { Flex, Skeleton, Stack, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { RisingSoundsTitle } from "../../components/RisingSoundsTitle";
import { RisingDaily, RisingTable } from "../../features/risingSounds";
import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
import { ISoundData } from "../../features/risingSounds/store";
import { useSoundsData } from "./hooks/useSoundsData";
import { pricingModal } from "../../pages/pricing/hooks/triggerPricingModalHook";

export const RisingSoundsPage = () => {
  const {
    query: { data, isSuccess, isLoading },
    page,
    setPage,
  } = useSoundsData();

  const pricing = pricingModal();
  const [opened, { open, close }] = useDisclosure(true);

  const tableData = useMemo<ISoundData[]>(() => {
    return (
      data?.music.map((el) => ({
        ...el,
        id: el.musicId,
        author: el.authorNickname || el.authorUniqueId || el.creator || "",
        authorId: el.authorIdLong,
      })) ?? []
    );
  }, [data?.music]);

  if (tableData.length > 0) {
    return (
      <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
        <RisingDaily />
        <Stack gap={16}>
          <RisingSoundsTitle />
          {isLoading && (
            <Stack gap={8}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} h={60} />
              ))}
            </Stack>
          )}
          {isSuccess && (
            <Stack gap={8}>
              <RisingTable tableData={tableData} />
              <RisingSoundsPagination page={page} setPage={setPage} total={data.totalRows} />
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  } else {
    return (
      <>
        <Stack align="center" justify="center" style={{ height: "100vh" }}>
          You're over your limit
        </Stack>
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          title="The limit's up."
          centered
        >
          <Stack align="center">
            You have reached the limit in your plan. For further use, buy a more advanced plan.
          </Stack>
          <Flex pt={5} gap={10} justify="center">
            <Button
              variant="filled"
              color="rgba(209, 253, 10, 1)"
              c="black"
              onClick={() => {
                close();
                pricing.openModal();
              }}
            >
              Pricing
            </Button>
            <Button variant="filled" color="gray" onClick={close}>
              Discard
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
};
