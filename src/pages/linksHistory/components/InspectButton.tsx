import React from "react";
import { Button, Flex, Text } from "@mantine/core";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const InspectButton: React.FC<{ id: string | number }> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Button
      role="link"
      bg="#3A3A3A"
      style={{ border: "1.5px solid #3A3A3A" }}
      onClick={() => navigate(`/video-to-script/${id}`)}
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
