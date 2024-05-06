import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Grid, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";
import { useEffect, useState } from "react";
import { useHashtags } from "./store/hashtags";
import { useLocation } from "react-router-dom";
import { useHashtagsAnalyticsData } from "../../pages/personalizedHashtags/hooks/useHashtagsAnalyticsData";

type Props = {
  accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[];
  openModal: any;
  country: string;
  category: number;
};

export const BalancedGroupsAI: React.FC<Props> = ({
  accountHashtagBalancedGroup,
  openModal,
  country,
  category,
}) => {
  const colors = [
    "rgba(0, 190, 110, 1)",
    "rgba(0, 179, 190, 1)",
    "rgba(0, 76, 190, 1)",
    "rgba(95, 0, 190, 1)",
  ];
  const { data: resData, isLoading: fetchIsLoading } = useHashtagsAnalyticsData({
    country,
    category,
  });
  const fetchData: ApiHashtagsAnalytics.ISoundHashtag[] | undefined = resData
    ? resData.topSoundHashtags
    : undefined;
  const [data, setData] = useState<ApiHashtagsAnalytics.ISoundHashtag[] | undefined>(undefined);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const store = useHashtags();

  useEffect(() => {
    if (
      (resData && !Object.entries(store.topSoundHashtags).length) ||
      pathname === "/ai-hashtags"
    ) {
      setData(fetchData);
      setIsLoading(fetchIsLoading);
    }
  }, [resData, pathname]);

  if (isLoading) {
    return (
      <Grid>
        {[1, 2, 3, 4, 5, 6, 7].map((el) => (
          <Grid.Col span={3} key={el}>
            <Skeleton h={180} />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (!data) return null;
  return (
    <>
      <Grid grow justify="center">
        {accountHashtagBalancedGroup.map(
          (
            {
              groupName,
              hahtags,
            }: {
              groupName: string;
              hahtags: string[];
            },
            index: number,
          ) => (
            <Grid.Col style={{ padding: 0, margin: "0.5rem" }} span={2} bg="#212122">
              <BalancedGroupCard
                color={colors[index % colors.length]}
                groupName={groupName}
                hahtags={hahtags}
                key={index}
                openModal={openModal}
              />
            </Grid.Col>
          ),
        )}
      </Grid>
    </>
  );
};
