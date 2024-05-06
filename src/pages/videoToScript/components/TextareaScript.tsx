import React from "react";
import { Textarea } from "@mantine/core";

interface Props {
  editable: boolean;
  text: string;
  setSubmitText: (text: any) => void;
}

export const TextareaScript: React.FC<Props> = ({ editable, text, setSubmitText }) => {
  return (
    <Textarea
      unstyled
      styles={{
        input: {
          height: "20vh",
          background: !editable ? "none" : "#242424",
          border: !editable ? "none" : "",
          borderRadius: "8px",
          overflow: "visible",
          width: "100%",
          fontSize: "16px",
          color: "white",
          resize: "none",
        },
      }}
      c={"#ffffff"}
      p={10}
      placeholder="Input Transcription..."
      style={{
        marginTop: "10px",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
      value={text}
      disabled={!editable}
      autosize={false}
      minRows={20}
      resize={"none"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        if (target && target.textContent) {
          setSubmitText(target.value);
        }
      }}
    ></Textarea>
  );
};
