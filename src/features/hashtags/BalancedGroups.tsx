import { BalancedGroupCard } from "./components/BalancedGroupCard";
import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
export const BalancedGroups = () => {
  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
                <BalancedGroupCard color={"rgba(0, 190, 110, 1)"} />
                <BalancedGroupCard color={"rgba(0, 179, 190, 1)"} />
                <BalancedGroupCard color={"rgba(0, 76, 190, 1)"} />
                <BalancedGroupCard color={"rgba(95, 0, 190, 1)"} />
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
};
