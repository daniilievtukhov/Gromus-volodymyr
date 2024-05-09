import { Box, Flex, Text, Paper, Group, Button, Switch, Textarea } from "@mantine/core";
import styled from "styled-components";
import { useScriptVideoStore } from "../store/videoToScript";
import { startCase } from "lodash";
import { useEffect, useRef, useState } from "react";
import { EditButton } from "./buttons/EditButton";
import { SaveButton } from "./buttons/SaveButton";
import { CopyButtonScript } from "./buttons/CopyButton";
import { CancelButton } from "./buttons/CancelButton";
import { TextareaScript } from "./TextareaScript";
import { ApiTranscriptionEdit } from "../../../requests/transcriptionEdit";

export const Transcript = () => {
  const store = useScriptVideoStore();
  const { id, 
          lang_generate, 
          language_original, 
          transcription_text 
        } = store;
  const [editable, setEditable] = useState<boolean>(false);
  const [onSubmitText, setSubmitText] = useState<string>(transcription_text);

  useEffect(() => {
    setSubmitText(store.transcription_text)
  }, [store])

  return (
      <Box 
        pb={"lg"}
        w="100%"
        style={{ minHeight: '400px'}}
        component="div"
      >
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
          <Box>
            <TextareaScript 
              editable={editable}
              text={onSubmitText}
              setSubmitText={setSubmitText}
            />
            
            <Flex
              align="center"
              justify={editable ? "space-between" : "normal"}
              gap={10}
              style={{ marginTop: "30px", padding: "0 20px" }}
            >                
                <CopyButtonScript copiedItem={onSubmitText} size="lg" />
              
                { !editable && <EditButton setEditable={setEditable} /> }
                { editable 
                && 
                <Group>

                   <SaveButton
                      onSubmit={(request: ApiTranscriptionEdit.IRequest) => ApiTranscriptionEdit.updateTranscriptionText(request)}
                      onSubmitText={onSubmitText}
                      originalText={language_original}
                      id={id}
                      lang={lang_generate}
                      onClick={() => setEditable(false)}
                 
                    /> 

                  <CancelButton
                    setEditable={setEditable}
                    setOnSubmitText={setSubmitText}
                    originalText={transcription_text}
                  /> 
                </Group>}
            </Flex>
          </Box>
        </Paper>
      </Box>
  );
};

const Wrapper = styled.div`
  min-width: 280px;
  background-color: rgba(19, 19, 20, 1);
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 50;
`;
