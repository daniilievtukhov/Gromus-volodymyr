import { Flex, Group, NumberInput, Pagination, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const RisingSoundsPagination = ({
  page,
  setPage,
  total,
}: {
  page: number;
  setPage: (v: number) => void;
  total: number;
}) => {
  const [localPage, setLocalPage] = useState(page);

  useEffect(() => {
    if (page !== localPage) {
      setLocalPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Flex justify={"center"} mt={16}>
      <Pagination.Root
        size={"lg"}
        radius={"xl"}
        color="#D1FD0A"
        autoContrast
        total={total}
        value={page}
        onChange={setPage}
      >
        <Group gap={12} justify="center">
          <Pagination.First />
          <Pagination.Previous />
          <Flex gap={10}>
            <NumberInput
              variant="filled"
              value={localPage}
              onValueChange={({ floatValue }) => floatValue && setLocalPage(floatValue)}
              onBlur={() => setPage(localPage)}
              allowNegative={false}
              allowDecimal={false}
              hideControls
              size="md"
              maw={70}
              radius={"xl"}
              min={1}
              max={total}
              styles={{
                input: {
                  textAlign: "center",
                },
              }}
            />
            <Text fz={12} c={"#8E8F92"}>
              of
            </Text>
            <Text fz={14} c={"#fff"}>
              {total}
            </Text>
          </Flex>
          <Pagination.Next />
          <Pagination.Last />
        </Group>
      </Pagination.Root>
    </Flex>
  );
};
