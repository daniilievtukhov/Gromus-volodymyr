import { Alert, Skeleton, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { memo, useMemo } from "react";

import { useAIAuthorAnalyticStore } from "../../store/accountAnalytic";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthorStatesAnalyticsData } from "../../hooks/useAuthorStatesAnalyticsData";
import { IStatesData, IVideoRised } from "../../store/accountStateAnalytics";
import { GraphAuthorTitle } from "./GraphAuthorTitle";
import { ApexChart } from "./ApexChart";
import styled from "styled-components";

export const AuthorGraphicStates = memo(({ authorId }: { authorId: number | string }) => {
  const {
    query: {
      data: fetchData,
      isSuccess: fetchIsSuccess,
      isLoading: fetchIsLoading,
      isError: fetchIsError,
    },
  } = useAuthorStatesAnalyticsData(authorId);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { pathname } = useLocation();

  const store = useAIAuthorAnalyticStore();

  useEffect(() => {
    if ((fetchData && !Object.entries(store.data).length) || pathname === "/my-account-analytics") {
      setData(fetchData);
      setIsSuccess(fetchIsSuccess);
      setIsError(fetchIsError);
      setIsLoading(fetchIsLoading);
    }
  }, [fetchData, pathname]);

  useEffect(() => {
    if (Object.entries(store.data).length && "authorStatesAnalytic" in store.data) {
      const data = store.data.authorStatesAnalytic;

      setData(data);
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }
  }, [store]);

  const states = useMemo<IStatesData[]>(() => {
    return (
      data?.states.map(
        (el: {
          id: string;
          authorId: string;
          subscribers: number;
          subscribedAt: number;
          clips: number;
          likes: number;
          diggCount: number;
          parseDate: string;
          subscribersDailyRise: number;
          subscribersDailyRiseForecastingError: number;
          subscribersDailyRiseForecasting: number;
          subscribersGraphWeight: number;
        }) => ({
          id: el.id,
          authorId: el.authorId,
          subscribers: el.subscribers,
          subscribedAt: el.subscribedAt,
          clips: el.clips,
          likes: el.likes,
          diggCount: el.diggCount,
          parseDate: el.parseDate,
          subscribersDailyRise: el.subscribersDailyRise,
          subscribersDailyRiseForecastingError: el.subscribersDailyRiseForecastingError,
          subscribersDailyRiseForecasting: el.subscribersDailyRiseForecasting,
          subscribersGraphWeight: el.subscribersGraphWeight,
        }),
      ) ?? []
    );
  }, [data?.states]);

  const videoRised = useMemo<IVideoRised[]>(() => {
    return (
      data?.videoRised.map(
        (el: {
          videoId: string;
          playCount: number;
          parseDate: string;
          coverUrl: string;
          likes: number;
          subscribers: number;
        }) => ({
          videoId: el.videoId,
          playCount: el.playCount,
          parseDate: el.parseDate,
          coverUrl: el.coverUrl,
          likes: el.likes,
          subscribers: el.subscribers,
        }),
      ) ?? []
    );
  }, [data?.videoRised]);

  //console.log("videoRised", videoRised);
  return (
    <Stack gap={16}>
      <GraphAuthorTitle />
      {isLoading && (
        <Stack gap={8}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} h={60} />
          ))}
        </Stack>
      )}
      {isSuccess && states.length > 0 && (
        <Stack gap={8}>
          <StyledDiv>
            <ApexChart videoRised={videoRised} states={states} />
          </StyledDiv>
        </Stack>
      )}

      {isError && (
        <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
          Something went wrong. We are working on getting this fixed as soon as we can.
        </Alert>
      )}
    </Stack>
  );
});

const StyledDiv = styled.div`
  .apexcharts-zoom-icon {
    display: none;
  }
  .apexcharts-point-annotations {
    cursor: pointer;
    padding: 2rem;
    border: 2px solid #c2fc46;
  }

  .apexcharts-legend-series {
    display: flex !important;
    align-items: center;
    padding: 0.5rem 0.8rem;
    background: #ffffff2b;
    border-radius: 3em;
    vertical-align: bottom;
  }
  .apexcharts-menu.apexcharts-menu-open {
    background: rgb(13 13 14 / 78%);
  }
  .apexcharts-menu.apexcharts-menu-open:hover {
    background: rgb(13 13 14);
  }
`;
