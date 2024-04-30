import { Input, Button, Select, Flex, Text, Image, Group } from "@mantine/core";
import { downloadSvg } from "../../../assets/index";
import { IconCopy, IconCheckbox } from "@tabler/icons-react";
import { useScriptVideoStore } from "../store/videoToScript";
export const DownloadVideo = () => {
  const url = useScriptVideoStore(state => state.url);
  
  return (
    <Flex gap={10}>
      <Input
        radius="lg"
        style={{ width: 665, height: 36, marginRight: -100 }}
        placeholder="The link, which will be copied"
        readOnly
        value={url}
      />
      <Button
        color="rgba(58, 58, 58, 1)"
        variant="filled"
        style={{ width: 100, height: 35, color: "white" }}
      >
        <IconCopy size={18} />
        Copy
      </Button>
      <Button
        color="rgba(209, 253, 10, 1)"
        variant="filled"
        style={{ width: 140, height: 35, color: "black" }}
      >
        <Image src={downloadSvg} /> Download
      </Button>
    </Flex>
  );
};
