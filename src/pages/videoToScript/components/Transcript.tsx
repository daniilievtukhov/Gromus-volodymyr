import { Box, Flex, Text, Paper, Group, Button, Switch, Textarea } from "@mantine/core";
import { IconCopyCheck, IconSparkles } from "@tabler/icons-react";
import { IconCopy, IconEdit, IconWorld, IconMessageChatbot } from "@tabler/icons-react";
import styled from "styled-components";
import { useScriptVideoStore } from "../store/videoToScript";
import { startCase } from "lodash";
import { useRef, useState } from "react";
import { EditButton } from "./buttons/EditButton";
import { SaveButton } from "./buttons/SaveButton";
import { ApiTranscriptionGenerate } from "../../../requests/transcriptionGenerate";
import { CopyButtonScript } from "./buttons/CopyButton";
import { ApiTranscriptionEdit } from "../../../requests/transcriptionEdit";
import { CancelButton } from "./buttons/CancelButton";
import { Saving } from "./Saving";

export const Transcript = () => {
  const { id, lang_generate, language_original, transcription_text } = useScriptVideoStore(state => state);

  const [editable, setEditable] = useState<boolean>(false);
  const [onSubmitText, setSubmitText] = useState<string>(transcription_text);
  const [saveButtonLoading, setSaveButtonLoading] = useState<boolean>(false);
  const [originalText, setOriginalText] = useState<string>(transcription_text);

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
                {startCase(Object.values(language_original)[0])}
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
                {startCase(Object.values(language_original)[0])}
              </Text>
            </Flex>
          </Flex>
          <Wrapper>
            <Text 
              c={"#ffffff"}
              bg={editable ? "#242424" : ""}
              p={10}
              
              style={{ marginTop: "10px", marginBottom: "20px", borderRadius: "8px"}}       
              contentEditable={editable}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target && target.textContent) {
                    console.log(target.textContent);
                    setSubmitText(target.textContent);
                }
              }
            }              
            >

             {originalText}
            </Text>
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "30px", padding: "0 20px" }}
            >
              <Flex justify={"space-between"} align="center" gap={10}>
                
                <CopyButtonScript copiedItem={onSubmitText} size="lg" />
              
                { !editable && <EditButton setEditable={setEditable} /> }
                { editable 
                && 
                <Group>
                  <SaveButton 
                    onSubmitText={onSubmitText} 
                    originalText={transcription_text} 
                    onSubmit={async () => {
                      setSaveButtonLoading(true)  
                      console.log(lang_generate);
                      const res = await ApiTranscriptionEdit.updateTranscriptionText({
                          id: id,
                          language: lang_generate,
                          text: onSubmitText
                        });

                        console.log(res)
                        useScriptVideoStore.setState(res.data)
                        setSaveButtonLoading(false)  
                        setEditable(false)
                      }
                    
                    } 
                    saveButtonLoading={saveButtonLoading}
                  /> 
                  <CancelButton
                    setOriginalText={setOriginalText}
                    setEditable={setEditable}
                    setOnSubmitText={setSubmitText}
                    originalText={transcription_text}
                  /> 
                </Group>}
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
