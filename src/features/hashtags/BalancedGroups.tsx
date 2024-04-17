import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";

type Props = {
  accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[];
};

const balanceGroup = (accountHashtagBalancedGroup) => {
  const maxLength = Math.max(accountHashtagBalancedGroup.map((el) => el.hahtags.length));
  const equalsHashtagsBalancedGroup = accountHashtagBalancedGroup.map(({ hahtags }) => {
    const restEl = maxLength - hahtags.length;

    return hahtags.push(...Array.from(restEl, () => null));
  });
  return equalsHashtagsBalancedGroup;
};
export const BalancedGroups: React.FC<Props> = ({ accountHashtagBalancedGroup }) => {
  const equalsHashtagsBalancedGroup = balanceGroup(accountHashtagBalancedGroup);

  const colors = [
    "rgba(0, 190, 110, 1)",
    "rgba(0, 179, 190, 1)",
    "rgba(0, 76, 190, 1)",
    "rgba(95, 0, 190, 1)",
  ];

  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea scrollbarSize={8} offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
                {equalsHashtagsBalancedGroup.map(
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
                    <BalancedGroupCard
                      color={colors[index % colors.length]}
                      groupName={groupName}
                      hahtags={hahtags}
                    />
                  ),
                )}
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
};
