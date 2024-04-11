import { Box, Flex, Image, Text } from "@mantine/core";
import {
  IconBookmarkFilled,
  IconEyeFilled,
  IconHeartFilled,
  IconMessageCircle2Filled,
} from "@tabler/icons-react";
import styled from "styled-components";

import { formatShortNumber } from "../../../core/helpers/formatShortNumber";
import { ApiSoundVideos } from "../../../requests/soundVideos";

export const Video = ({ data }: { data: ApiSoundVideos.IVideo }) => {
  return (
    <Box pos={"relative"}>
      <a href={data.videoUrl} target="_blank">
        <Image
          src={data.cover}
          w={165}
          h={295}
          fallbackSrc="https://placehold.co/165x295/black/white?text=No preview"
        />
      </a>
      <Text fz={14} fw={"bold"}>
        <Grid>
          <Flex gap={4}>
            <IconEyeFilled size={14} color="#d1fd0a" />
            {formatShortNumber(data.playCount)}
          </Flex>
          <Flex gap={4}>
            <IconMessageCircle2Filled size={14} color="#d1fd0a" />
            {formatShortNumber(data.commentsCount)}
          </Flex>
          <Flex gap={4}>
            <IconHeartFilled size={14} color="#d1fd0a" />
            {formatShortNumber(data.likes)}
          </Flex>
          <Flex gap={4}>
            <IconBookmarkFilled size={14} color="#d1fd0a" />
            {formatShortNumber(data.collectCount)}
          </Flex>
        </Grid>
      </Text>
    </Box>
  );
};

const Grid = styled.div`
  padding: 8px;
  background-color: #000;
  display: grid;
  gap: 6px;
  grid-template-columns: 1fr 1fr;
`;
