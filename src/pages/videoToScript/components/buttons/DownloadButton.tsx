import { Button, Loader, Text } from "@mantine/core";
import { IconDownload, IconAlertCircle } from "@tabler/icons-react";
import axios from "axios";
import { useState, useEffect } from "react";

export const DownloadButton = ({ downloadUrl }: { downloadUrl: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `file.${response.data.type.split("/")[1]}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isError]);

  return (
    <Button
      role="link"
      color="rgba(209, 253, 10, 1)"
      variant="filled"
      onClick={handleDownload}
      style={{ height: 35, color: "black" }}
      loading={isLoading}
    >
      {isError ? (
        <>
          <IconAlertCircle />
          Error
        </>
      ) : (
        <>
          <IconDownload />
          Download
        </>
      )}
    </Button>
  );
};