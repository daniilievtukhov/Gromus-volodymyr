import React, { useState } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { Button, Notification } from "@mantine/core";
import { useScriptVideoStore } from "../../store/videoToScript";
import { useMutation } from "@tanstack/react-query";
import { ApiTranscriptionEdit } from "../../../../requests/transcriptionEdit";
import { useEffect } from "react";

interface Props {
  id: string | number;
  lang: string;
  text: string;
}

export const RethinkButton: React.FC<Props> = ({ id, lang, text }) => {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Props) =>
      ApiTranscriptionEdit.regenerateAIText({
        id: values.id,
        lang: values.lang,
        text: values.text,
      }),
    onSuccess: (res) => {
      useScriptVideoStore.setState(res.data);
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    },
    onError: () => {
      setErrorMessage(true);
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

  return (
    <>
      <Button
        size="lg"
        color="white"
        fz="md"
        variant="outline"
        onClick={() => mutate({ id, lang, text })}
        loading={isPending}
        disabled={errorMessage}
      >
        <IconSparkles style={{ marginRight: 4 }} />
        {errorMessage ? "Something went wrong..." : "Rethink"}
      </Button>
    </>
  );
};