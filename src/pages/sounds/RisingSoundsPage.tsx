import { Flex, Skeleton, Stack, Modal, Button, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { RisingSoundsTitle } from "../../components/RisingSoundsTitle";
import { RisingDaily, RisingTable } from "../../features/risingSounds";
import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
import { ISoundData } from "../../features/risingSounds/store";
import { useSoundsData } from "./hooks/useSoundsData";
import { pricingModal } from "../../pages/pricing/hooks/triggerPricingModalHook";
import { isAxiosError } from "axios";
import { IconInfoCircle, IconMoodSad } from "@tabler/icons-react";

export const RisingSoundsPage = () => {
  const {
    query: { data, isSuccess, isLoading, error, isError },
    page,
    setPage,
  } = useSoundsData();

  const pricing = pricingModal();
  const [opened, { close }] = useDisclosure(true);

  if (isError) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return (
        <Stack align="center" justify="center" p={32} pb={102} gap={52} bg="#0D0D0E" mih="100vh">
          <Alert variant="light" color="orange" title="Sounds not found" icon={<IconMoodSad />}>
            We currently do not have data for your sounds parameters. They will appear soon.
          </Alert>
        </Stack>
      );
    } else {
      if (isAxiosError(error) && error.response?.status === 403) {
        return (
          <>
            <Stack
              align="center"
              justify="center"
              p={32}
              pb={102}
              gap={52}
              bg="#0D0D0E"
              mih="100vh"
            >
              <Alert variant="light" color="orange" title="Limitation" icon={<IconMoodSad />}>
                You're over your limit
              </Alert>
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
                  color="lime.4"
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
      return (
        <Flex align="center" justify="center" h="100vh">
          <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
            Something went wrong. We are working on getting this fixed as soon as we can.
          </Alert>
        </Flex>
      );
    }
  }

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

  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
      <RisingDaily />
      <Stack gap={16}>
        {isLoading && (
          <>
            <RisingSoundsTitle />
            <Stack gap={8}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} h={60} />
              ))}
            </Stack>
          </>
        )}
        {isSuccess && tableData.length > 0 && (
          <Stack gap={8}>
            <RisingTable tableData={tableData} />
            <RisingSoundsPagination page={page} setPage={setPage} total={data.totalRows} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
