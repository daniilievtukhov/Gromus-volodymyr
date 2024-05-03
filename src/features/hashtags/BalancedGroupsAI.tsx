import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Grid, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";

type Props = {
  accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[];
  openModal: any;
};

export const BalancedGroupsAI: React.FC<Props> = ({ accountHashtagBalancedGroup, openModal }) => {
  const colors = [
    "rgba(0, 190, 110, 1)",
    "rgba(0, 179, 190, 1)",
    "rgba(0, 76, 190, 1)",
    "rgba(95, 0, 190, 1)",
  ];

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
