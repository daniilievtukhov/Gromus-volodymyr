import { Avatar, Flex, Group, Paper, Stack, Title, Tooltip } from "@mantine/core";

import { ApiDaySounds } from "../../../requests/stats/daySounds";
import { PlayMusicButton } from "../../playMusicButton/PlayMusic";
import { SocialLinks } from "./SocialLinks";
import { ISoundType, SoundType } from "./SoundType";

export interface ISound {
  id: string;
  image: string;
  name: string;
  type: ISoundType;
}

export const Sound = ({ data }: { data: ApiDaySounds.IMusic }) => {
  return (
    <Paper p={10} w={200} radius={0} bg="dark.8" style={{ overflow: "hidden" }}>
      <Stack gap={8}>
        <Group justify="space-between">
          <Avatar src={data.cover} radius="xl" size={36} />
          <PlayMusicButton audioLink={data.playUrl} id={data.musicId} />
        </Group>

        <Flex>
          <Tooltip label={data.title}>
            <Title order={3} fz={16} fw={600} c="white" lineClamp={1}>
              {data.title}
            </Title>
          </Tooltip>
        </Flex>

        <Group justify="space-between">
          {data.musicOriginal ? <SoundType type={"original"} /> : <div />}

          <SocialLinks shazam={data.shazamLink} tiktok={data.tikTokLink} />
        </Group>
      </Stack>
    </Paper>
  );
};
