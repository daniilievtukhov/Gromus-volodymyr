import React from "react";
import { Anchor, Button, Flex, Text, Image } from "@mantine/core";

import { playSvg } from "../../../assets";

const OpenVideoButton: React.FC<{ path: string }> = ({ path }) => {
  return (
    <Button
      component="a"
      href={path}
      target="_blank"
      bg="none"
      style={{ border: "1.5px solid #3A3A3A" }}
    >
      <Flex gap={"sm"}>
        <Image src={playSvg} />
        <Text fw={600} fz={"md"}>
          Open video
        </Text>
      </Flex>
    </Button>
  );
};

export default OpenVideoButton;
