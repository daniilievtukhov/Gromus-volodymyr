import { Alert, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconArrowUpRight, IconInfoCircle } from "@tabler/icons-react";
import { sum } from "lodash-es";
import styled from "styled-components";

import WorldMap from "../../../assets/world.svg?react";
import { Flag } from "../../../components/Flag";
import { PercentBar } from "../../../components/PercentBar";
import { useAuthorAnalyticsData } from "../hooks/useAuthorAnalyticsData";
import { useState, useEffect } from "react";
import { useAIAuthorAnalyticStore } from "../../../features/chat/store";

interface LocationData {
  locationCode: string;
  rate: number;
}

interface AuthorData {
  locations: LocationData[];
  risingSinceWeek?: {
    riseSubscribersSinceWeek: number;
    riseLikesSinceWeek: number;
    riseClipsSinceWeek: number;
  };
}

export const RecommendationMap = ({ authorId }: { authorId: number | string }) => {
  const {
    data: fetchData,
    isLoading: fetchIsLoading,
    isSuccess: fetchIsSuccess,
    isError: fetchIsError,
  } = useAuthorAnalyticsData(authorId);
  const [data, setData] = useState<AuthorData>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const store = useAIAuthorAnalyticStore();

  useEffect(() => {
    setData(fetchData);
    setIsSuccess(fetchIsSuccess);
    setIsError(fetchIsError);
    setIsLoading(fetchIsLoading);
  }, [fetchData]);

  useEffect(() => {
    if (store.data.length) {
      const data = store.data.find((item) => item.DataType === "AuthorAnalytic")
        ?.Data as AuthorData;
      console.log(data);

      setData(data);
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }
  }, [store]);

  const totalRate = sum(data?.locations.map((el) => el.rate) || []);

  const countries = data?.locations.map((el) => el.locationCode.toLowerCase()) || [];

  return (
    <Stack gap={0}>
      <Group c="lime.4" gap={10} mb={12}>
        <Circle>
          <IconArrowUpRight size={14} strokeWidth={3} />
        </Circle>
        <Text fz={20} fw={"bold"} c={"#D1FD0A"}>
          <White>TikTok creator</White> recommendation map
        </Text>
      </Group>

      {isLoading && (
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Skeleton h={300} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={18}>
              <Skeleton h={12} />
              <Skeleton h={12} />
              <Skeleton h={12} />
              <Skeleton h={12} />
            </Stack>
          </Grid.Col>
        </Grid>
      )}

      {isSuccess && countries.length > 0 && (
        <>
          <Text mb={34}>
            TikTok often suggests this creator globally, with a focus on the{" "}
            <Flag code={countries[0].toUpperCase()} /> {countries[0].toUpperCase()}
          </Text>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <MapWrapper $countries={countries}>
                <StyledMap />
              </MapWrapper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={18}>
                {data?.locations.map((el) => (
                  <PercentBar
                    key={el.locationCode}
                    label={el.locationCode}
                    value={(el.rate / totalRate) * 100}
                  />
                ))}
              </Stack>
            </Grid.Col>
          </Grid>
        </>
      )}

      {isSuccess && countries.length === 0 && (
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
};

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

const White = styled.span`
  color: white;
`;

const MapWrapper = styled.div<{ $countries: string[] }>`
  ${(p) => p.$countries.map((c) => "#" + c).join(", ")} {
    fill: #d1fd0a;

    path {
      fill: #d1fd0a;
    }
  }
`;

const StyledMap = styled(WorldMap)`
  max-width: 100%;

  path {
    fill: #212122;
    stroke: #6e7178;
    stroke-width: 0.2px;
  }
`;
