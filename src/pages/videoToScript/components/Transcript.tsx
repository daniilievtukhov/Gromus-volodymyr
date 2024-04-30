import { Box, Flex, Text, Paper, Group, Button, Switch } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { IconCopy, IconEdit, IconWorld, IconMessageChatbot } from "@tabler/icons-react";
import styled from "styled-components";
import { useScriptVideoStore } from "../store/videoToScript";
import { startCase } from "lodash";

export const Transcript = () => {
  const { language_original, transcription_text } = useScriptVideoStore(state => state);

  console.log(language_original);
  console.log(transcription_text);

  return (
    <>
      <Box style={{ margin: 0, position: "relative" }}>
        <Paper
          style={{
            height: "60px",
            backgroundColor: "rgba(33, 33, 34, 1)",
            borderRadius: 10,
            marginTop: "30px",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: "0 20px", height: "100%" }}
          >
            <Flex align="center" style={{ height: "100%", alignItems: "flex-end" }}>
              <Text fz={16} fw={600} c={"#ffffff"} lh={1.25} truncate="end">
                Transcript
              </Text>
              <Button
                color="rgba(209, 253, 10, 1)"
                variant="filled"
                style={{ minWidth: 100, height: 30, color: "black", marginLeft: 10 }}
              >
                {startCase(language_original)}
              </Button>
            </Flex>
            <Flex align="center" style={{ height: "100%", alignItems: "flex-end" }}>
              <Text fz={16} fw={600} c={"#ffffff"} lh={1.25} truncate="end">
                English
              </Text>
              <Switch
                style={{ marginLeft: 10, marginRight: 10 }}
                defaultChecked
                color="rgba(209, 253, 10, 1)"
                size="md"
                thumbIcon={
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                      display: "inline-block",
                    }}
                  />
                }
              />
              <Text fz={16} fw={600} c={"#ffffff"} lh={1.25} truncate="end">
                {startCase(language_original)}
              </Text>
            </Flex>
          </Flex>
          <Wrapper>
            <Text c={"#ffffff"} style={{ marginTop: "10px", marginBottom: "20px" }}>

             {transcription_text}
            </Text>
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "30px", padding: "0 20px" }}
            >
              <Flex align="center" gap={10}>
                {/* <Button
                  size="lg"
                  color="rgba(58, 58, 58, 1)"
                  variant="filled"
                  style={{ color: "white" }}
                >
                  <IconCopy size={18} style={{ marginRight: 4 }} />
                  Copy
                </Button>
                <Button size="lg" color="white" fz="md" variant="outline">
                  <IconEdit style={{ marginRight: 4 }} />
                  Edit
                </Button> */}
              </Flex>
            </Flex>
          </Wrapper>
        </Paper>
      </Box>
    </>
  );
};
const Wrapper = styled.div`
  min-width: 280px;
  background-color: rgba(19, 19, 20, 1);
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 50;
`;
