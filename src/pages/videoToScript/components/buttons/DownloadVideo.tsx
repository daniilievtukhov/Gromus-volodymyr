import { Input, Button, Select, Flex, Text, Image, Group } from "@mantine/core";
import { downloadSvg } from "../../../../assets/index";
import { IconCopy, IconCheckbox, IconCircleArrowLeftFilled } from "@tabler/icons-react";
import { CopyButtonScript } from "./CopyButton";
import { useScriptVideoStore } from "../../store/videoToScript";
import { useNavigate } from "react-router-dom";

export const DownloadVideo = () => {
  const url = useScriptVideoStore((state) => state.url);
  const navigate = useNavigate();
  return (
    <Flex gap={10}>
      <Button
        role="link"
        bg="#3A3A3A"
        style={{ border: "1.5px solid #3A3A3A" }}
        onClick={() => {
          navigate("/links-history");
        }}
      >
        <Flex gap={"sm"}>
          <IconCircleArrowLeftFilled />
          <Text fw={600} fz={"md"}>
            Go back
          </Text>
        </Flex>
      </Button>
      <Input
        radius="lg"
        style={{ width: 665, height: 36, marginRight: -100 }}
        placeholder="The link, which will be copied"
        readOnly
        value={url}
      />
      <CopyButtonScript copiedItem={url} size="sm" />
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
