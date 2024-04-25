import { Flex, Stack, Text } from "@mantine/core";
import { AccentTitle } from "../../../../components/AccentTitle";
import { bulleted_list } from "../../../../assets/index";
import { VoiceOperations } from "../VoiceOperations";
import { SeoOnTiktok } from "../../../linksHistory/components/components/components/SeoOnTiktok";
import { Transcript } from "../../../linksHistory/components/components/components/Transcript";
import { microSvg } from "../../../../assets/index";

export const VoiceToScriptPage = () => {
  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="140vh">
      <Stack gap={16}>
        <AccentTitle image={microSvg}>
          <AccentTitle.Color>Voice</AccentTitle.Color> to script
        </AccentTitle>
        <VoiceOperations />
        <Transcript />P
        <SeoOnTiktok />
      </Stack>
    </Stack>
  );
};
