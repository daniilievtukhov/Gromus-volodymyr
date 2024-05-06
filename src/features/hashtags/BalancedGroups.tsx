import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Grid, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";
import { useHashtagsAnalyticsData } from "../../pages/personalizedHashtags/hooks/useHashtagsAnalyticsData";

type Props = {
  accountHashtagBalancedGroup: ApiHashtagsAnalytics.IHashtagBalance[];
  openModal: any;
};

export const BalancedGroups: React.FC<Props> = ({ accountHashtagBalancedGroup, openModal }) => {
  const colors = [
    "rgba(0, 190, 110, 1)",
    "rgba(0, 179, 190, 1)",
    "rgba(0, 76, 190, 1)",
    "rgba(95, 0, 190, 1)",
  ];
  if (accountHashtagBalancedGroup.length === 0) return null;

  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea scrollbarSize={8} offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
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
                    <BalancedGroupCard
                      color={colors[index % colors.length]}
                      groupName={groupName}
                      hahtags={hahtags}
                      key={index}
                      openModal={openModal}
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
