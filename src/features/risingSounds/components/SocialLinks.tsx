import { ActionIcon, Flex, Image } from "@mantine/core";
import styled from "styled-components";

import { appleMusic, shazam, spotify, tiktok } from "../../../assets";

interface IProps {
  shazam?: string | null;
  tiktok?: string | null;
  spotify?: string | null;
  appleMusic?: string | null;
}

export const SocialLinks = (props: IProps) => {
  return (
    <Flex gap={6}>
      {props.shazam && (
        <Action component="a" href={props.shazam}>
          <Image w={19} src={shazam} />
        </Action>
      )}
      {props.tiktok && (
        <Action component="a" href={props.tiktok}>
          <Image w={19} src={tiktok} />
        </Action>
      )}
      {props.spotify && (
        <Action component="a" href={props.spotify}>
          <Image w={19} src={spotify} />
        </Action>
      )}
      {props.appleMusic && (
        <Action component="a" href={props.appleMusic}>
          <Image w={19} src={appleMusic} />
        </Action>
      )}
    </Flex>
  );
};

const Action: typeof ActionIcon = styled(ActionIcon).attrs({
  size: 20,
  variant: "subtle",
  component: "a",
  target: "_blank",
})`
  border: none;
  border-radius: 50%;
`;
