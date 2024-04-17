import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { HashtagCard } from "./components/HashtagCard";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";
import React from "react";

type Props = {
  topSoundHashtags: ApiHashtagsAnalytics.ISoundHashtag[];
};

export const TopFiveHashtags: React.FC<Props> = ({ topSoundHashtags }) => {
  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea scrollbarSize={8} offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
                {topSoundHashtags.map(
                  ({
                    dailyGrowth,
                    hashtag,
                    link,
                    posts,
                    probableNextWeekTrend,
                    status,
                    views,
                  }: {
                    dailyGrowth: number;
                    hashtag: string;
                    link: string;
                    posts: number;
                    probableNextWeekTrend: boolean;
                    status: string;
                    views: number;
                  }) => (
                    <HashtagCard
                      dailyGrowth={dailyGrowth}
                      hashtag={hashtag}
                      link={link}
                      posts={posts}
                      probableNextWeekTrend={probableNextWeekTrend}
                      status={status}
                      views={views}
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
