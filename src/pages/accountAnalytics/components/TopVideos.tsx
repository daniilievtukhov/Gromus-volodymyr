import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import {
  IconChevronsUp,
  IconEyeFilled,
  IconHeartFilled,
  IconInfoCircle,
  IconMessageCircle2Filled,
  IconPlayerPlay,
  IconShare3,
} from "@tabler/icons-react";

import { useState, useEffect } from "react";
import { TitleCircle, White } from "../../../components/Styled";
import { formatShortNumber } from "../../../core/helpers/formatShortNumber";
import { useAuthorAnalyticsData } from "../hooks/useAuthorAnalyticsData";
import { useAIAuthorAnalyticStore } from "../../../features/chat/store";
import { Video } from "./Video";

export const TopVideos = ({ authorId }: { authorId: number | string }) => {
  const {
    data: fetchData,
    isLoading: fetchIsLoading,
    isSuccess: fetchIsSuccess,
    isError: fetchIsError,
  } = useAuthorAnalyticsData(authorId);
  const [data, setData] = useState<{
    mostViews?: { cover: string; playCount: number };
    mostShares?: { cover: string; shares: number };
    mostEngagement?: { cover: string; likes: number; playCount: number };
    mostComments?: { cover: string; commentsCount: number };
    mostLiked?: { cover: string; likes: number };
  }>({
    mostViews: undefined,
    mostShares: undefined,
    mostEngagement: undefined,
    mostComments: undefined,
    mostLiked: undefined,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const store = useAIAuthorAnalyticStore();

  useEffect(() => {
    if (fetchData) {
      const { mostViews, mostShares, mostEngagement, mostComments, mostLiked } = fetchData;
      setData({
        mostViews: mostViews || undefined,
        mostShares: mostShares || undefined,
        mostEngagement: mostEngagement || undefined,
        mostComments: mostComments || undefined,
        mostLiked: mostLiked || undefined,
      });
      setIsSuccess(fetchIsSuccess);
      setIsError(fetchIsError);
      setIsLoading(fetchIsLoading);
    }
  }, [fetchData, fetchIsSuccess, fetchIsError, fetchIsLoading]);

  useEffect(() => {
    if (store.data.length) {
      const data = store.data.find((item) => item.DataType === "AuthorStatesAnalytic")?.Data;

      if (data) {
        setData(data);
        setIsSuccess(true);
        setIsError(false);
        setIsLoading(false);
      }
    }
  }, [store]);

  const hasData =
    data?.mostViews ||
    data?.mostShares ||
    data?.mostEngagement ||
    data?.mostComments ||
    data?.mostLiked;

  return (
    <Stack gap={16}>
      <Group c="lime.4" gap={10}>
        <TitleCircle>
          <IconPlayerPlay size={14} strokeWidth={3} />
        </TitleCircle>
        <Text fz={20} fw={"bold"} c={"#D1FD0A"}>
          Top 5 videos <White>of the author according to various indicators</White>
        </Text>
      </Group>
      {isLoading && (
        <Flex gap={12}>
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
        </Flex>
      )}
      {isSuccess && hasData && (
        <ScrollArea offsetScrollbars pb={10} scrollbarSize={6} type="always">
          <Flex gap={12}>
            {data.mostViews && (
              <Video
                cover={data.mostViews.cover}
                label={"Most Viewed"}
                value={formatShortNumber(data.mostViews.playCount)}
                icon={<IconEyeFilled size={18} />}
              />
            )}

            {data.mostShares && (
              <Video
                cover={data.mostShares.cover}
                label={"Most Shared"}
                value={formatShortNumber(data.mostShares.shares)}
                icon={<IconShare3 size={18} />}
              />
            )}

            {data.mostEngagement && (
              <Video
                cover={data.mostEngagement.cover}
                label={"Most Engaged"}
                value={formatShortNumber(
                  (data.mostEngagement.likes / data.mostEngagement.playCount) * 100,
                )}
                icon={<IconChevronsUp size={18} />}
              />
            )}

            {data.mostComments && (
              <Video
                cover={data.mostComments.cover}
                label={"Most Commented"}
                value={formatShortNumber(data.mostComments.commentsCount)}
                icon={<IconMessageCircle2Filled size={18} />}
              />
            )}

            {data.mostLiked && (
              <Video
                cover={data.mostLiked.cover}
                label={"Most Liked"}
                value={formatShortNumber(data.mostLiked.likes)}
                icon={<IconHeartFilled size={18} />}
              />
            )}
          </Flex>
        </ScrollArea>
      )}

      {isSuccess && !hasData && (
        <Alert variant="light" color="gray.5" icon={<IconInfoCircle />}>
          Author don't have top videos
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
