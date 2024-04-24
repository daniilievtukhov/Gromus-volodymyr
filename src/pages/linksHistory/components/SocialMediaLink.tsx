import { 
  Group, 
  Image, 
  Text, 
  NavLink,
  Anchor,
  CopyButton,
} from "@mantine/core";


import { IconCopy, IconCheckbox } from "@tabler/icons-react";
import React, { useState } from "react";
import { youtubeCircleIcon } from "../../../assets/index";

const SocialMediaLink:React.FC<{title: string, id: string | number, path: string}> = ({ title, id, path}) => {
    return (
        <Group key={id}>
            <Image src={youtubeCircleIcon} radius={"100%"} width={36} height={36}/>
            <Anchor 
              c={"white"}
              underline="never"
              href={path}
              fw={"600"}
            >
              {title}
            </Anchor>
            <CopyButton value={path} timeout={3000}>
              {({ copied, copy }) => (
               !copied 
                  ? <IconCopy onClick={copy} style={{ cursor: 'pointer' }} />
                  : <IconCheckbox/>
              )}
            </CopyButton>
        </Group>
    );
}

export default SocialMediaLink;