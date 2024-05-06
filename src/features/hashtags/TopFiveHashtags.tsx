import { Flex, ScrollArea, Skeleton, Stack, Tabs } from "@mantine/core";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";
import { HashtagCard } from "./components/HashtagCard";

type Props = {
  topSoundHashtags: ApiHashtagsAnalytics.ISoundHashtag[];
};

export const TopFiveHashtags: React.FC<Props> = ({ topSoundHashtags }) => {
  if (topSoundHashtags.length === 0) return null;

  return (
    <>
      <Stack gap={24}>
        <Tabs defaultValue="geo">
          <Tabs.Panel value="geo">
            <ScrollArea scrollbarSize={8} offsetScrollbars>
              <Flex gap={12} align={"stretch"} py={12}>
                {topSoundHashtags.map(
                  (
                    {
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
                    },
                    index: number,
                  ) => (
                    <HashtagCard
                      dailyGrowth={dailyGrowth}
                      hashtag={hashtag}
                      link={link}
                      posts={posts}
                      probableNextWeekTrend={probableNextWeekTrend}
                      status={status}
                      views={views}
                      key={index}
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
