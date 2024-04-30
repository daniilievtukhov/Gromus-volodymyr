import { Flex, Stack, Text } from "@mantine/core";
import { AccentTitle } from "../../components/AccentTitle";
import { bulleted_list } from "../../assets/index";
import { DownloadVideo } from "./components/DownloadVideo";
import { SeoOnTiktok } from "./components/SeoOnTiktok";
import { Transcript } from "./components/Transcript";
import { bulletSvg } from "../../assets/index";

export const VideoToScriptPage = () => {
  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="140vh">
      <Stack gap={16}>
        <AccentTitle image={bulletSvg}>
          <AccentTitle.Color>Video</AccentTitle.Color> to script
        </AccentTitle>
        <DownloadVideo />

        <Transcript />
        <SeoOnTiktok />
      </Stack>
    </Stack>
  );
};
