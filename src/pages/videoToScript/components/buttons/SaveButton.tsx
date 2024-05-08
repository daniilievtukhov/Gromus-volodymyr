import React from "react";
import { Button, Notification } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { ApiTranscriptionEdit } from "../../../../requests/transcriptionEdit";
import { useScriptVideoStore } from "../../store/videoToScript";
import { useState, useEffect } from "react";

interface SaveButtonProps {
  onSubmitText: string;
  originalText: string;
  id: string | number;
  lang: string;
  onClick: () => void;
  onSubmit: any
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  onClick,
  onSubmitText,
  originalText,
  id,
  lang,
  onSubmit
}) => {

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ApiTranscriptionEdit.IRequest) => {
      const {id, lang, text} = values

      return await onSubmit({
        id,
        lang,
        text,
      })
    },
    onSuccess: (res: any) => {
      console.log(res);

      useScriptVideoStore.setState(res.data);
      onClick()
    },
    onError: () => {
        setErrorMessage(true)
    },
  });


  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (errorMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [errorMessage]);


  const handleSave = async () => {
    mutate({
      id,
      lang,
      text: onSubmitText
    });
  };

  return (
    <>
      <Button
        size="lg"
        color="rgba(209, 253, 10, 1)"
        c="black"
        variant="filled"
        fz="md"
        disabled={onSubmitText === originalText || errorMessage}
        onClick={handleSave}
        loading={isPending}
      >
        <IconEdit style={{ marginRight: 4 }} />
        {errorMessage ? "Something went wrong..." : "Save changes"}
      </Button>
      
    </>
  );
};