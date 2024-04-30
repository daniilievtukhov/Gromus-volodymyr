import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Grid, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";

type Props = {
  accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[];
  openModal: any;
};

/*const balanceGroup = (accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[]) => {
  let maxLength = 0;

  accountHashtagBalancedGroup.forEach((el) => {
    if (el.hahtags.length > maxLength) {
      maxLength = el.hahtags.length;
    }
  });

  const equalsHashtagsBalancedGroup = accountHashtagBalancedGroup.map((el) => {
    const restEl = maxLength - el.hahtags.length;

    return {
      ...el,
      hahtags: [...el.hahtags, ...Array(restEl).fill(null)],
    };
  });

  return equalsHashtagsBalancedGroup;
};*/

export const BalancedGroups: React.FC<Props> = ({ accountHashtagBalancedGroup, openModal }) => {
  // const equalsHashtagsBalancedGroup = balanceGroup(accountHashtagBalancedGroup);

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
            <Grid.Col style={{ padding: 0, margin: "0.5rem" }} span={2}>
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
