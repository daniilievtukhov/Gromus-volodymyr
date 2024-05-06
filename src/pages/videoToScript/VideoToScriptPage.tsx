import { Flex, Stack, Text, Skeleton } from "@mantine/core";
import { AccentTitle } from "../../components/AccentTitle";
import { bulleted_list } from "../../assets/index";
import { DownloadVideo } from "./components/buttons/DownloadVideo";
import { SeoOnTiktok } from "./components/SeoOnTiktok";
import { Transcript } from "./components/Transcript";
import { bulletSvg } from "../../assets/index";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiTranscriptionHistory } from "../../requests/transcriptionHistory";
import { useScriptVideoStore } from "./store/videoToScript";
import { useEffect, useState } from "react";

export const VideoToScriptPage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    mutate({ id: id || "" });
  }, []);

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (params: ApiTranscriptionHistory.IRequestDetails) => {
      return ApiTranscriptionHistory.getById(params);
    },
    onSuccess: (res) => {
      useScriptVideoStore.setState(res.data);
    },
  });

  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="140vh">
      {isPending && <SkeletonContent />}

      {isSuccess && (
        <Stack gap={16}>
          <AccentTitle image={bulletSvg}>
            <AccentTitle.Color>Video</AccentTitle.Color> to script
          </AccentTitle>
          <Stack>
            <DownloadVideo />
            <Flex direction="column" gap="sm">
              <Transcript />
              <SeoOnTiktok />
            </Flex>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

const SkeletonContent = () => (
  <Stack gap={16}>
    <Skeleton h={"10vh"} />
    <Skeleton h={"50vh"} />
    <Skeleton h={"10vh"} />
    <Skeleton h={"50vh"} />
  </Stack>
);
