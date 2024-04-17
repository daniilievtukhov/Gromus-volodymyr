import { Alert, Flex, Group, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";

import { Green, TitleCircle } from "../../../../components/Styled";
import { useAuthorAnalyticsData } from "../../hooks/useAuthorAnalyticsData";
import { AuthorCard } from "./AuthorCard";

export const Competitors = ({ authorId }: { authorId: number | string }) => {
  const { isLoading, data, isSuccess } = useAuthorAnalyticsData(authorId);

  return (
    <Stack gap={24}>
      <Group c="lime.4" gap={10}>
        <TitleCircle>
          <IconUsers size={14} strokeWidth={3} />
        </TitleCircle>
        {isLoading ? (
          <Skeleton h={20} w={"80%"} />
        ) : data && (data.competitorsAudience.length > 0 || data.competitorsGeo.length > 0) ? (
          <Text fz={20} fw={"bold"} c={"#fff"}>
            The author has <Green>{data?.competitorsGeo.length || "-"} top competitors</Green> in
            his country{" "}
            {data && data.competitorsAudience.length > 0 && (
              <>
                and <Green>{data?.competitorsAudience.length || "-"} in audience</Green>
              </>
            )}
          </Text>
        ) : (
          <Text fz={20} fw={"bold"} c={"#fff"}>
            The author don't has competitors
          </Text>
        )}
      </Group>

      <Tabs defaultValue="geo">
        <Tabs.List>
          <Tabs.Tab value="geo">Geo</Tabs.Tab>
          <Tabs.Tab value="audience">Audience</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="geo">
          <ScrollArea offsetScrollbars>
            <Flex gap={12} align={"stretch"} py={12}>
              {isLoading && (
                <>
                  <Skeleton h={220} />
                  <Skeleton h={220} />
                  <Skeleton h={220} />
                </>
              )}
              {isSuccess && (
                <>
                  {data.competitorsGeo.map((c) => (
                    <AuthorCard key={c.authorId} data={c} />
                  ))}
                </>
              )}

              {isSuccess && data.competitorsGeo.length === 0 && (
                <>
                  <Alert variant="light" color="gray.5" icon={<IconInfoCircle />} w={"100%"}>
                    No data
                  </Alert>
                </>
              )}
            </Flex>
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="audience">
          <ScrollArea offsetScrollbars>
            <Flex gap={12} align={"stretch"} py={12}>
              {isLoading && (
                <>
                  <Skeleton h={220} />
                  <Skeleton h={220} />
                  <Skeleton h={220} />
                </>
              )}
              {isSuccess && (
                <>
                  {data.competitorsAudience.map((c) => (
                    <AuthorCard key={c.authorId} data={c} />
                  ))}
                </>
              )}
              {isSuccess && data.competitorsAudience.length === 0 && (
                <>
                  <Alert variant="light" color="gray.5" icon={<IconInfoCircle />} w={"100%"}>
                    No data
                  </Alert>
                </>
              )}
            </Flex>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
