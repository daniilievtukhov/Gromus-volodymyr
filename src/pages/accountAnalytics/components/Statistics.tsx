import { Grid, Skeleton } from "@mantine/core";

import { useAuthorAnalyticsData } from "../hooks/useAuthorAnalyticsData";
import { Tile } from "./Tile";

export const Statistics = ({ authorId }: { authorId: number | string }) => {
  const { data, isLoading } = useAuthorAnalyticsData(authorId);

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
            value: data.risingSinceWeek.riseSubscribersSinceWeek,
            // percent: 184,
          }}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="first"
          title="❤️ Likes"
          value={data.author.likes}
          header={{
            label: "Since last week",
            value: data.risingSinceWeek.riseLikesSinceWeek,
            // percent: 184,
          }}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="first"
          title="🎬 Videos"
          value={data.author.clips}
          header={{
            label: "Since last week",
            value: data.risingSinceWeek.riseClipsSinceWeek,
            // percent: 184,
          }}
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="second"
          title="Avg. Views"
          value={data.calculations.avgViews}
          subTitle="Over all videos"
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="second"
          title="Avg. Views"
          value={data.calculations.avgViewsMonth}
          subTitle="Since last month"
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile
          type="second"
          title="Avg. Views"
          value={data.calculations.avgViewsWeek}
          subTitle="Since last week"
        />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile type="third" title="Total Views" value={data.calculations.trendViews} />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile type="third" title="Total Comments" value={data.calculations.trendComments} />
      </Grid.Col>
      <Grid.Col span={span}>
        <Tile type="third" title="Total Shares" value={data.calculations.trendShares} />
      </Grid.Col>
    </Grid>
  );
};
