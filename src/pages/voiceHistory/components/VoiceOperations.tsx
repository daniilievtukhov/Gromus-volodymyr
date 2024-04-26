import { Title, Image, Group, Button, Paper, Flex } from "@mantine/core";
import {
  uploadSvg,
  microphoneSvg,
  blackMicrophoneSvg,
  blackUploadSvg,
} from "../../../assets/index";

export const VoiceOperations = () => {
  return (
    <>
      <Flex gap={5} wrap="nowrap" justify="center" direction="row">
        <Title c="white" fz="16px" style={{ display: "flex" }}>
          You can either
        </Title>
        <Image w={20} h={20} src={microphoneSvg} />
        <Title c="lime.4" fz="16px">
          {" "}
          record your voice
        </Title>
        <Title c="white" fz="16px">
          or
        </Title>
        <Image w={20} h={20} src={uploadSvg} />
        <Title c="lime.4" fz="16px" style={{ display: "flex" }}>
          upload audio
        </Title>
      </Flex>

      <Group
        gap={10}
        justify="space-around"
        style={{ minWidth: "429px", width: "100%", margin: "0 auto" }}
      >
        <Paper
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "96px",
            minWidth: "429px",
            backgroundColor: "rgba(19, 19, 20, 1)",
            borderRadius: 0,
            padding: "10px",
          }}
        >
          <Button
            radius="md"
            color="rgba(209, 253, 10, 1)"
            variant="filled"
            style={{
              width: 48,
              height: 48,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image w={20} src={blackMicrophoneSvg} />
          </Button>
          <Title c="white" fz="16px" style={{ marginLeft: "10px" }}>
            Record voice
          </Title>
        </Paper>
        <Paper
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "96px",
            minWidth: "429px",
            backgroundColor: "rgba(19, 19, 20, 1)",
            borderRadius: 0,
            padding: "10px",
          }}
        >
          <Button
            radius="md"
            color="rgba(209, 253, 10, 1)"
            variant="filled"
            style={{
              width: 48,
              height: 48,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image w={20} src={blackUploadSvg} />
          </Button>
          <Title c="white" fz="16px" style={{ marginLeft: "10px" }}>
            Upload audio
          </Title>
        </Paper>
      </Group>
    </>
  );
};
