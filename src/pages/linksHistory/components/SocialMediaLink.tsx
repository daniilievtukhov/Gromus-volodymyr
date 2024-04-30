import { 
  Group, 
  Image, 
  Anchor,
  CopyButton,
} from "@mantine/core";
import { tiktokWhite, instagramOutline } from "../../../assets/index";

import { IconCopy, IconCheckbox } from "@tabler/icons-react";
import React, { useState } from "react";

interface ICover {
  title: string,
  image: string
} 

const socialMediaSvg  = (path: string):ICover => {
  if(path.includes("tiktok")) {
    return {
      title: "Tik-tok reels",
      image: tiktokWhite
    };
  }

  if(path.includes("instagram")) {
    return {
      title: "Instagram reels",
      image: instagramOutline
    };
  }

  return {
    title: "Reels",
    image: tiktokWhite
  }

}

const SocialMediaLink:React.FC<{id: string | number, path: string}> = ({ id, path }) => {

    const { title, image } = socialMediaSvg(path)

    return (
        <Group key={id}>
            <div style={{borderRadius: "100%", padding: "15px", background: "#212122", margin: "22px"}}>
              <Image src={image} width={"20px"} height={"20px"}/>
            </div>
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