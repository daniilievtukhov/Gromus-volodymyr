import { Avatar, Button, Flex, Group, Stack, Text, Tooltip } from "@mantine/core";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { openMusicVideoModal } from "../../../globalStore";
import { ISoundData } from "../store";
import { SocialLinks } from "./SocialLinks";

export const SoundCell = ({ data }: { data: ISoundData }) => {
  return (
    <Group gap={8} align="center" wrap="nowrap">
      <Avatar src={data.cover} radius="xl" size={36} />
      <Stack gap={0} align="flex-start">
        <Tooltip label={data.title}>
          <Text fz={16} fw={600} c="white" maw={"200px"} truncate="end">
            {data.title}
          </Text>
        </Tooltip>
        <Tooltip label={data.author || "-"}>
          {data.authorId && data.authorId !== -1 ? (
            <StyledLink to={`/account-analytics/${data.authorId}`}>
              <Text maw={"200px"} truncate="end">
                {data.author || ""}
              </Text>
            </StyledLink>
          ) : (
            <Text maw={"200px"} truncate="end">
              {data.author || ""}
            </Text>
          )}
        </Tooltip>
        <Flex gap={6} mt={4}>
          <SocialLinks
            shazam={data.shazamLink}
            tiktok={!data.notAvailable ? data.tikTokLink : null}
          />
          <Button
            size={"compact-xs"}
            radius={"xl"}
            variant="outline"
            color="#fff"
            style={{
              borderColor: "#3D3D3F",
            }}
            disabled={!data.reposts}
            onClick={() => openMusicVideoModal(data.id)}
          >
            Videos
          </Button>
        </Flex>
      </Stack>
    </Group>
  );
};

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #8e8f92;

  &:hover {
    color: #fff;
  }
`;
