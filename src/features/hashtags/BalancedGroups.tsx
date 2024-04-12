import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics"; 

type Props = {
  accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[]
}

export const BalancedGroups:React.FC<Props> = ({ accountHashtagBalancedGroup }) => {
  const colors = [
    "rgba(0, 190, 110, 1)",
    "rgba(0, 179, 190, 1)",
    "rgba(0, 76, 190, 1)",
    "rgba(95, 0, 190, 1)"
  ]

  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
                {accountHashtagBalancedGroup.map(({
                  groupName,
                  hahtags
                }: {
                  groupName: string,
                  hahtags: string[]
                }, index: number) => (
                  <BalancedGroupCard color={colors[index % colors.length]} groupName={groupName} hahtags={hahtags} />
                ))}
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
};
