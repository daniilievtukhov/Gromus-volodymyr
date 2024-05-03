import React, { useState } from "react";
import { Anchor, Button, Flex, Text, Image } from "@mantine/core";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";
import { inspectSvg } from "../../../assets";
import { useScriptVideoStore } from "../../videoToScript/store/videoToScript";
import { ApiTranscriptionHistory } from "../../../requests/transcriptionHistory";
import { useNavigate } from "react-router-dom";

export const InspectButton: React.FC<{ id: string | number }> = ({ id }) => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const onClick = async () => {
    setBtnLoading(true);
    console.log(id);
    await ApiTranscriptionHistory.getById({ id: id }).then((res) => {
      console.log(res);
      useScriptVideoStore.setState(res.data);
    });

    setBtnLoading(false);

    navigate("/video-to-script");
  };

  return (
    <Button
      role="link"
      bg="#3A3A3A"
      style={{ border: "1.5px solid #3A3A3A" }}
      loading={btnLoading}
      onClick={onClick}
    >
      <Flex gap={"sm"}>
        <Text fw={600} fz={"md"}>
          See details
        </Text>
        <IconCircleArrowRightFilled />
      </Flex>
    </Button>
  );
};
