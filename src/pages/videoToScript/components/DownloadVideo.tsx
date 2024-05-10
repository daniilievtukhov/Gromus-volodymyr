import { Input, Button, Select, Flex, Text, Image, Group, TextInput } from "@mantine/core";
import {
  IconCircleArrowLeftFilled,
  IconDownload,
} from "@tabler/icons-react";
import { CopyButtonScript } from "./buttons/CopyButton";
import { useScriptVideoStore } from "../store/videoToScript";
import { useNavigate } from "react-router-dom";
import { DownloadButton } from "./buttons/DownloadButton";

export const DownloadVideo = () => {
  const { url, id, title } = useScriptVideoStore((state) => state);

  console.log(useScriptVideoStore());
  const navigate = useNavigate();
  return (
    <Flex gap={10} wrap={"wrap"}>
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
      <TextInput
        radius="lg"
        style={{ width: 400, height: 36 }}
        placeholder="The link, which will be copied"
        readOnly
        value={url}
        rightSectionWidth={100}
        rightSection = {
          <div style={{ marginLeft: 10 }}>
            <CopyButtonScript copiedItem={url} size="sm" />
          </div>
        }
      />
      <DownloadButton id={id} title={title} />
    </Flex>
  );
};
