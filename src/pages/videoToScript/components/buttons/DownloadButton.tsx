import { Anchor, Button, Loader, Text } from "@mantine/core";
import { IconDownload, IconAlertCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { ApiTranscriptionDownload } from "../../../../requests/transcription/DownloadVideo";

export const DownloadButton = ({ id, title }: { id: string | number, title: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isError]);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const { data } = await ApiTranscriptionDownload.getLink({ id });
      const response = await fetch(data.download_url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const filename = response.headers
        .get("Content-Disposition")
        ?.split("=")[1]
        .replace(/"/g, "") || `${title}.mp4`;

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      role="link"
      color="rgba(209, 253, 10, 1)"
      variant="filled"
      style={{ height: 35, color: "black" }}
      loading={isLoading}
      onClick={handleDownload}
    >
      {isError ? (
        <>
          <IconAlertCircle /> Error
        </>
      ) : (
        <>
          <IconDownload /> Download
        </>
      )}
    </Button>
  );
};