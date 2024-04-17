import { Alert, Flex, Group, Modal, ScrollArea, Skeleton, Text } from "@mantine/core";
import { IconInfoCircle, IconPlayerPlay } from "@tabler/icons-react";
import styled from "styled-components";

import { closeMusicVideoModal, useGlobalStore } from "../../globalStore";
import { Video } from "./components/Video";
import { useVideosData } from "./hooks/useVideosData";

export const MusicVideosModal = () => {
  const { opened } = useGlobalStore((s) => s.musicVideosModal);

  const { data, isLoading, isSuccess, isError } = useVideosData();

  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={closeMusicVideoModal}
      keepMounted={false}
      centered
      title={
        <Group c="lime.4" gap={10}>
          <Circle>
            <IconPlayerPlay size={14} strokeWidth={3} />
          </Circle>
          <Text fz={20} fw={"bold"} c={"#D1FD0A"}>
            Top videos <White>to this sound</White>
          </Text>
        </Group>
      }
    >
      {isLoading && (
        <Flex gap={12}>
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
          <Skeleton w={165} h={295} />
        </Flex>
      )}
      {isSuccess && (
        <ScrollArea offsetScrollbars pb={10} scrollbarSize={6} type="always">
          <Flex gap={12}>
            {data.map((video) => (
              <Video key={video.videoId} data={video} />
            ))}
          </Flex>
        </ScrollArea>
      )}
      {isError && (
        <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
          Something went wrong. We are working on getting this fixed as soon as we can.
        </Alert>
      )}
    </Modal>
  );
};

const Circle = styled.div`
  display: flex;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
  background-color: #d1fd0a;
  border-radius: 100px;
  color: #000;
`;

const White = styled.span`
  color: white;
`;
