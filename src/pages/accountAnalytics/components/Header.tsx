import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconDownload,
  IconHeart,
  IconLink,
  IconLockFilled,
  IconShare,
} from "@tabler/icons-react";
import styled from "styled-components";

import { Flag } from "../../../components/Flag";
import { useChatStore } from "../../../features/chat/store";
import { SocialLinks } from "../../../features/risingSounds/components/SocialLinks";
import { ApiAuthorAnalytics } from "../../../requests/authorAnalytics";
import { useAuthorAnalyticsData } from "../hooks/useAuthorAnalyticsData";
import { VerifiedLabel } from "./VerifiedLabel";
import { useEffect, useState } from "react";
import { useAIAuthorAnalyticStore } from "../../../features/chat/store";

export const Header = ({ authorId }: { authorId: number | string }) => {
  const [data, setData] = useState<ApiAuthorAnalytics.IResponse | undefined>(undefined);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const store = useAIAuthorAnalyticStore();
  const { data: fetchData, isSuccess: fetchIsSuccess } = useAuthorAnalyticsData(authorId);

  const updateData = (isSuccess: boolean, data: ApiAuthorAnalytics.IResponse | undefined) => {
    setData(data);
    setIsSuccess(isSuccess);
  };

  useEffect(() => {
    if (fetchData) {
      updateData(fetchIsSuccess, fetchData);
    }
  }, [fetchData]);

  useEffect(() => {
    if (store.data.length) {
      const data = store.data.find((item) => item.DataType === "AuthorAnalytic")?.Data;

      if (data) {
        updateData(true, data as ApiAuthorAnalytics.IResponse);
      }
    }
  }, [store]);

  return (
    <div>
      {isSuccess && data && data.author && (
        <>
          <Stack gap={18} mb={18}>
            <Group justify={"flex-end"}>
              <Button
                variant="subtle"
                size={"xs"}
                color={"#94969C"}
                leftSection={<IconLink size={20} />}
              >
                TikTok
              </Button>
              <Button
                variant="subtle"
                size={"xs"}
                color={"#94969C"}
                leftSection={<IconShare size={20} />}
              >
                Share
              </Button>
              <Button
                variant="subtle"
                size={"xs"}
                color={"#94969C"}
                leftSection={<IconHeart size={20} />}
              >
                Add to Favorites
              </Button>
              <Button
                variant="subtle"
                size={"xs"}
                color={"#3C6DFF"}
                leftSection={<IconDownload size={20} />}
              >
                Download Report
              </Button>
            </Group>
            <Divider color="#19191A" />
          </Stack>

          <Space h={20} />

          <Grid>
            <Box>
              <Flex gap={10} align={"center"}>
                <Avatar
                  size={60}
                  src={`https://sys-datapoint.flaidata.com/Author/Avatars/${data.author.authorId}.jpeg`}
                />
                <Stack gap={0} pos="relative">
                  {data.author.verified && (
                    <Box pos="absolute" top={-24}>
                      <VerifiedLabel />
                    </Box>
                  )}

                  <Group gap={12}>
                    <Text fz={24} fw={600} lh="30px" c={"#fff"}>
                      {data.author.nickname}
                    </Text>
                    <SocialLinks tiktok={data.author.url} />
                  </Group>
                  <Text fz={16} fw={600} lh="20px" c={"#fff"}>
                    @{data.author.uniqueId}
                  </Text>
                </Stack>
              </Flex>
              <Space h={16} />
              <Flex gap={10}>
                <GrayText fw={600}>Region:</GrayText>
                <Flex gap={6}>
                  <Flag code={data.author.region} />
                  <Text fz={12} fw={600}>
                    {data.author.region}
                  </Text>
                </Flex>
              </Flex>
              <Space h={8} />
              <Flex gap={10}>
                <GrayText fw={600}>Category:</GrayText>
                <Button
                  size="xs"
                  color="#212122"
                  c="lime.4"
                  leftSection={<IconLockFilled size={20} />}
                  rightSection={
                    <Badge color="lime.4" c="black" size="24px" fz={12} px={8}>
                      Pro
                    </Badge>
                  }
                  pr={2}
                >
                  Show Category
                </Button>
              </Flex>
              {data.author.signature && <GrayText mt={12}>{data.author.signature}</GrayText>}
            </Box>

            <Divider orientation="vertical" color="#FFFFFF0D" />

            <Stack justify="space-between">
              {/* <Box>
                {data.chartPositions.length === 2 && (
                  <Grid $gap={16}>
                    <PositionCard title="User Place" data={data.chartPositions[0]} />
                    <Divider orientation="vertical" color="#FFFFFF0D" />
                    <PositionCard title="Artist Place" data={data.chartPositions[1]} />
                  </Grid>
                )}
              </Box> */}

              <Box>
                <Text mb={16} fz={12} fw={600} c={"#BCBFC7"}>
                  Powered by AI:
                </Text>
                <Flex wrap={"wrap"} gap={6}>
                  <Badge color="#EF6820" size="lg">
                    {data.influencerStatus}
                  </Badge>
                </Flex>
              </Box>
            </Stack>
          </Grid>
        </>
      )}
    </div>
  );
};

const GrayText: typeof Text = styled(Text).attrs({ c: "#8E8F92", fz: 12, fw: 600 })``;

const Grid = styled.div<{ $gap?: number }>`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: ${({ $gap }) => $gap ?? 40}px;
`;

const PositionCard = ({
  title,
  data,
}: {
  title: string;
  data: ApiAuthorAnalytics.ChartPosition;
}) => {
  const diff = data.previousPlace - data.place;
  const abs = Math.abs(diff);
  const isPositive = diff > 0;
  const isNew = data.previousPlace === 101;

  return (
    <Stack align="baseline">
      <Group
        py={12}
        px={16}
        bg={!isNew ? (isPositive ? "#00BE6E" : "#E7294B") : "#bbb"}
        c={!isNew ? "white" : "#bbb"}
        justify="center"
        gap={0}
      >
        {isPositive ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
        <Text fz={12} fw={700}>
          {`${abs} place${abs > 1 ? "s" : ""}`}
        </Text>
      </Group>
      <Stack gap={4}>
        <Text fz={13}>{title}</Text>
        <Text fz={18} fw={700} c="white">
          {`Top 100 ${data.chartName}`}
        </Text>
      </Stack>
    </Stack>
  );
};
