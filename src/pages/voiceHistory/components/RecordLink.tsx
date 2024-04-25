import { Group, Image, Text, NavLink, Anchor, CopyButton } from "@mantine/core";

import { IconCopy, IconCheckbox } from "@tabler/icons-react";
import React, { useState } from "react";
import { whiteMicrophoneSvg, whiteUploadSvg } from "../../../assets/index";

const RecordLink: React.FC<{ title: string; id: string | number; path: string }> = ({
  title,
  id,
  path,
}) => {
  return (
    <Group key={id}>
      <Image
        src={whiteMicrophoneSvg}
        radius={"100%"}
        w={36}
        bg={" rgba(33, 33, 34, 1)"}
        style={{ padding: "10px" }}
      />
      <Anchor c={"white"} underline="never" href={path} fw={"600"}>
        {title}
      </Anchor>
      <CopyButton value={path} timeout={3000}>
        {({ copied, copy }) =>
          !copied ? <IconCopy onClick={copy} style={{ cursor: "pointer" }} /> : <IconCheckbox />
        }
      </CopyButton>
    </Group>
  );
};

export default RecordLink;
