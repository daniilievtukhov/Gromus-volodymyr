import { Flex, Badge, Button } from "@mantine/core";
import { Icon, IconPlayerPlay } from "@tabler/icons-react";

import styled, { css, keyframes } from "styled-components";
import { useHowItWorkStore } from "../features/greeting/store";

interface IProps {
  title: string;
  icon: JSX.Element | string;
  onClick: () => void | null;
  clicked?: boolean;
}

export const AnimatedButtonDark = ({ title, icon, onClick, clicked = false }: IProps) => {
  return (
    <AnimatedButtonStyle
      clicked={clicked}
      onClick={onClick}
      size="sm"
      color="#212122"
      c="#fff"
      leftSection={
        <Badge color="lime.4" c="black" size="15px" fz={12} px={2}>
          <Flex justify="center" align="center" direction="row" wrap="nowrap">
            {icon}
          </Flex>
        </Badge>
      }
      pr={20}
      pl={20}
    >
      {title}
    </AnimatedButtonStyle>
  );
};

export const AnimatedButtonWh = ({ title, icon, onClick, clicked = false }: IProps) => {
  return (
    <AnimatedButtonStyle
      clicked={clicked}
      onClick={onClick}
      size="sm"
      variant="white"
      c="#000"
      leftSection={
        <Badge color="lime.4" c="black" size="15px" fz={12} px={2}>
          <Flex justify="center" align="center" direction="row" wrap="nowrap">
            {icon}
          </Flex>
        </Badge>
      }
      pr={20}
      pl={20}
    >
      {title}
    </AnimatedButtonStyle>
  );
};

const inoutAnim = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(255,255,255,0.4);
  }
  100% {
    box-shadow: 0 0 0 40px rgba(255,255,255,0);
  }
`;
interface IButtonProps {
  clicked: boolean;
  children: React.ReactNode;
  variant?: "default" | "outline" | "link" | "white";
  color?: string;
  c?: string;
  leftSection?: React.ReactNode;
  disabled?: boolean; // Whether the button is disabled
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: string | number;
  pr?: string | number;
  pl?: string | number;
}

export const AnimatedButtonStyle = styled(Button)<IButtonProps>`
  ${(props) =>
    props.clicked === false
      ? css`
          animation: ${inoutAnim} 1.5s ease infinite;
        `
      : css`
          animation: none;
        `}
`;
