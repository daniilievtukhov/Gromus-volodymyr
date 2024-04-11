import { Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { memo } from "react";
import styled from "styled-components";

import { PercentBar } from "../../../components/PercentBar";
import { useAuthorAnalyticsData } from "../hooks/useAuthorAnalyticsData";

export const Categories = memo(({ authorId }: { authorId: number | string }) => {
  const { data, isSuccess, isLoading } = useAuthorAnalyticsData(authorId);
  const mainCategories = data?.categories.slice(0, 3) || [];
  const otherCategories = data?.categories.slice(3, data.categories.length) || [];

  return (
    <Stack gap={16}>
      <Group c="lime.4" gap={10}>
        <Circle>
          <IconUsers size={14} strokeWidth={3} />
        </Circle>
        {isLoading ? (
          <Skeleton h={20} w={"80%"} />
        ) : (
          <Text fz={20} fw={"bold"} c={"#fff"}>
            The creator has <Green>{mainCategories?.length} main categories</Green>, and{" "}
            <Green>a total of {data?.categories.length} categories</Green>
          </Text>
        )}
      </Group>

      <Grid>
        {isSuccess && (
          <>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack gap={16}>
                {mainCategories.map((c) => (
                  <PercentBar key={c.categoryId} label={c.categoryName} value={c.percentage} />
                ))}
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack gap={16}>
                {otherCategories.map((c) => (
                  <PercentBar key={c.categoryId} label={c.categoryName} value={c.percentage} />
                ))}
              </Stack>
            </Grid.Col>
          </>
        )}

        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((c) => (
            <Grid.Col span={{ base: 12, sm: 6 }} key={c}>
              <Skeleton w={"10%"} h={16} mb={6} />
              <Skeleton h={10} />
            </Grid.Col>
          ))}
      </Grid>
    </Stack>
  );
});

const Circle = styled.div`
  display: flex;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
  background-color: #d1fd0a;
  border-radius: 100px;
  color: #000;
`;

const Green = styled.span`
  color: #d1fd0a;
`;
