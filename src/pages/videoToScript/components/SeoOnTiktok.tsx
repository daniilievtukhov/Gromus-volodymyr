import { Box, Flex, Text, Paper, Group, Button, Textarea } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { IconCopy, IconEdit, IconWorld, IconMessageChatbot } from "@tabler/icons-react";
import styled from "styled-components";
import { useScriptVideoStore } from "../store/videoToScript";
import { useState } from "react";
import { CopyButtonScript } from "./buttons/CopyButton";
import { EditButton } from "./buttons/EditButton";
import { SaveButton } from "./buttons/SaveButton";
import { ApiTranscriptionEdit } from "../../../requests/transcriptionEdit";
import { CancelButton } from "./buttons/CancelButton";
import { RethinkButton } from "./buttons/RethinkButton";
import { TextareaScript } from "./TextareaScript";
import { isNil } from "lodash";

const sliceStr = (str: string, length = 50) => {
  return str && str.length > length ? str.slice(0, length) + "..." : str;
};

export const SeoOnTiktok = () => {
  const {
    id,
    lang_generate,
    title,
    new_generate_text,
    transcription_text,
    ai_hashtag,
    original_hashtags,
    ai_title,
    url,
  } = useScriptVideoStore((state) => state);
  console.log("store", useScriptVideoStore());
  const [editable, setEditable] = useState<boolean>(false);
  const [onSubmitText, setSubmitText] = useState<string>(new_generate_text);
  console.log(ai_title);
  const title_seo = ai_title
    ? sliceStr(ai_title)
    : url.includes("tiktok")
      ? "Tik-tok Reels"
      : "Instagram Reels";

  console.log(new_generate_text);

  return (
    <>
      <Box style={{ marginTop: 300, position: "relative" }}>
        <Paper
          style={{
            height: "60px",
            backgroundColor: " rgba(209, 253, 10, 1) ",
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
              <Text fz={16} fw={600} c={"#000000"} lh={1.25} truncate="end">
                <IconSparkles stroke={1.5} style={{ verticalAlign: "middle", cursor: "pointer" }} />
                {title_seo}
              </Text>
            </Flex>
          </Flex>

          <Wrapper>
            <Paper
              style={{
                minHeight: "50px",
                backgroundColor: " rgba(33, 33, 34, 1)",
                borderRadius: 10,
                marginTop: "20px",
              }}
            >
              <Group align="center">
                <Text
                  fz={16}
                  fw={600}
                  c={"#ffffff"}
                  lh={1.25}
                  truncate="end"
                  style={{ marginLeft: 8, marginTop: "5px" }}
                >
                  Original:
                </Text>
                <Text
                  fz={16}
                  fw={400}
                  c={"#ffffff"}
                  lh={1.25}
                  truncate="end"
                  style={{ marginTop: "5px" }}
                >
                  {original_hashtags || "#Hashtags"}
                </Text>
              </Group>
              <Group align="center" gap={6}>
                <Text
                  fz={16}
                  fw={600}
                  c={"rgba(209, 253, 10, 1)"}
                  lh={1.25}
                  truncate="end"
                  style={{ marginLeft: 8 }}
                >
                  AI-Based:
                </Text>
                <Text fz={16} fw={400} c={"#ffffff"} lh={1.25} truncate="end">
                  {sliceStr(ai_hashtag) || "#AIHashtags"}
                </Text>
              </Group>
            </Paper>
            <TextareaScript editable={editable} text={onSubmitText} setSubmitText={setSubmitText} />

            <Flex
              justify={editable ? "space-between" : "normal"}
              align="center"
              gap={10}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <CopyButtonScript copiedItem={onSubmitText} size="lg" />

              {!editable && <EditButton setEditable={setEditable} />}
              {editable && (
                <Group>
                  <SaveButton
                    onSubmitText={onSubmitText}
                    originalText={new_generate_text}
                    onSubmit={async () => {
                      console.log(lang_generate);
                      const res = await ApiTranscriptionEdit.updateAIText({
                        id: id,
                        lang: lang_generate,
                        text: onSubmitText,
                      });

                      console.log(res);
                      useScriptVideoStore.setState(res.data);
                      setEditable(false);
                    }}
                  />
                  <CancelButton
                    setEditable={setEditable}
                    setOnSubmitText={setSubmitText}
                    originalText={new_generate_text}
                  />
                </Group>
              )}
              {!editable && (
                <>
                  <RethinkButton
                    onSubmit={async () => {
                      console.log(id, lang_generate, transcription_text);
                      return await ApiTranscriptionEdit.regenerateAIText({
                        id: id,
                        lang: lang_generate,
                        text: transcription_text,
                      });
                    }}
                  />
                  {/* <Button size="lg" color="white" fz="md" variant="outline">
                    <IconMessageChatbot style={{ marginRight: 4 }} />
                    Regenerate hashtags
                  </Button>
                  <Button size="lg" color="white" fz="md" variant="outline">
                    <IconWorld style={{ marginRight: 4 }} />
                    Change Language
                  </Button> */}
                </>
              )}
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
  padding-bottom: 10px;
  border-radius: 50;
`;
