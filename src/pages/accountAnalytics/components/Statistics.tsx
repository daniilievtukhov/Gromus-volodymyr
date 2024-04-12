import { Grid, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuthorAnalyticsData } from "../hooks/useAuthorAnalyticsData";
import { useAIAuthorAnalyticStore } from "../../../features/chat/store";
import { Tile } from "./Tile";
interface AnalyticsData {
  author: {
    subscribers: number;
    likes: number;
    clips: number;
  };
  risingSinceWeek?: {
    riseSubscribersSinceWeek: number;
    riseLikesSinceWeek: number;
    riseClipsSinceWeek: number;
  };
  calculations?: {
    avgViews: number;
    avgViewsMonth: number;
    avgViewsWeek: number;
    trendViews: number;
    trendComments: number;
    trendShares: number;
  };
}

export const Statistics = ({ authorId }: { authorId: number | string }) => {
  const [data, setData] = useState<AnalyticsData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const store = useAIAuthorAnalyticStore();
  const { data: fetchData, isLoading: fetchIsLoading } = useAuthorAnalyticsData(authorId);

  useEffect(() => {
    setData(fetchData);
    setIsLoading(fetchIsLoading);
  }, [fetchData]);

  useEffect(() => {
    if (store.data.length) {
      const data = store.data.find((item) => item.DataType === "AuthorAnalytic")?.Data;
      setData(data as AnalyticsData); // Явное приведение типа
      setIsLoading(false);
    }
  }, [store]);

  if (isLoading) {
    return (
      <Grid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
          <Grid.Col span={4} key={el}>
            <Skeleton h={100} />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (!data) return null;

  const span = { base: 12, md: 6, lg: 4 };

  return (
    <Grid align="stretch">
      <Grid.Col span={span}>
        <Tile
          type="first"
          title="🙋‍♂️ Followers"
          value={data.author.subscribers}
          header={{
            label: "Since last week",
            value: data.risingSinceWeek?.riseSubscribersSinceWeek ?? 0,
            // percent: 184,
          }}
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="first"
          title="❤️ Likes"
          value={data.author.likes}
          header={{
            label: "Since last week",
            value: data.risingSinceWeek?.riseLikesSinceWeek ?? 0,
            // percent: 184,
          }}
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="first"
          title="🎬 Videos"
          value={data.author.clips}
          header={{
            label: "Since last week",
            value: data.risingSinceWeek?.riseClipsSinceWeek ?? 0,
            // percent: 184,
          }}
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="second"
          title="Avg. Views"
          value={data?.calculations?.avgViews ?? 0}
          subTitle="Over all videos"
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="second"
          title="Avg. Views"
          value={data?.calculations?.avgViewsMonth ?? 0}
          subTitle="Since last month"
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="second"
          title="Avg. Views"
          value={data?.calculations?.avgViewsWeek ?? 0}
          subTitle="Since last week"
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="third"
          title="Total Views"
          value={data?.calculations?.trendViews ?? 0}
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="third"
          title="Total Comments"
          value={data?.calculations?.trendComments ?? 0}
          authorId={authorId}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="third"
          title="Total Shares"
          value={data?.calculations?.trendShares ?? 0}
          authorId={authorId}
        />
      </Grid.Col>
    </Grid>
  );
};
