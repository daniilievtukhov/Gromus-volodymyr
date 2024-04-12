import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { HashtagCard } from "./components/HashtagCard";

export const TopFiveHashtags = () => {
  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
                <HashtagCard />
                <HashtagCard />
                <HashtagCard />
                <HashtagCard />
                <HashtagCard />
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
};
