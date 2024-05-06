import React from "react";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "@mantine/core";

interface Props {
  setEditable: (editable: boolean) => void;
  setOnSubmitText: (text: string) => void;
  originalText: string;
}

export const CancelButton: React.FC<Props> = ({ setEditable, setOnSubmitText, originalText }) => {
  return (
    <Button
      size="lg"
      color="white"
      fz="md"
      variant="outline"
      onClick={() => {
        setEditable(false);
        setOnSubmitText(originalText);
      }}
    >
      Cancel
    </Button>
  );
};
