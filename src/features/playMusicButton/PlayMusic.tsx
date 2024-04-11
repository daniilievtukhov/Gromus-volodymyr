import { ActionIcon, Box, Tooltip } from "@mantine/core";
import {
  IconLoader2,
  IconMoodSad,
  IconPlayerPause,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { keyframes, styled } from "styled-components";

import { usePlayer } from "../../core/hooks/usePlayer";

export type PlayMusicButtonProps = {
  audioLink: string;
  id: string;
};

export const PlayMusicButton = ({ audioLink, id }: PlayMusicButtonProps) => {
  const { isActive, isPending, isError, progress, toggle } = usePlayer({ id, url: audioLink });

  if (isError) {
    return (
      <Tooltip label={"Audio was not found"}>
        <Box pos="relative">
          <StyledButton size={36} radius="xl" variant="outline">
            <IconMoodSad size={16} />
          </StyledButton>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box pos="relative" onClick={toggle}>
      {progress > 0 && <Loading progress={progress} />}
      <StyledButton
        size={36}
        radius="xl"
        variant="outline"
        data-play={isActive}
        data-active={progress > 0}
      >
        {isPending ? (
          <Loader />
        ) : isActive ? (
          <IconPlayerPause size={16} />
        ) : (
          <IconPlayerPlayFilled size={16} />
        )}
      </StyledButton>
    </Box>
  );
};

const spinAnimation = keyframes`
    100% { transform: rotate(360deg); } 
`;

const Loader = styled(IconLoader2).attrs({ size: 20 })`
  animation: ${spinAnimation} 2s ease infinite;
`;

const StyledButton: typeof ActionIcon = styled(ActionIcon)`
  position: relative;
  overflow: visible;
  color: white;
  border-color: var(--mantine-color-dark-4);
  transition: 0.2s;

  &:hover {
    color: black;
    background-color: var(--mantine-color-lime-4);

    border-color: var(--mantine-color-lime-4);

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--mantine-color-lime-4);
      opacity: 0.5;
      filter: blur(30px);
    }
  }

  &[data-play="true"] {
    background-color: transparent;
    color: white;
  }
  &[data-active="true"] {
    border: none;
  }
`;

const Loading = ({ progress }: { progress: number }) => {
  return (
    <StyledSvg viewBox="0 0 50 50">
      <StyledCircle
        $progress={100}
        cx="50%"
        cy="50%"
        r="20"
        fill="none"
        strokeWidth="1"
        $color="dark-4"
      />
      <StyledCircle $progress={progress} cx="50%" cy="50%" r="20" fill="none" strokeWidth="2" />
    </StyledSvg>
  );
};

const StyledSvg = styled.svg`
  position: absolute;
  height: calc(100% + 8px);
  top: -4px;
  left: -4px;
  rotate: -90deg;
`;

const StyledCircle = styled.circle<{ $progress: number; $color?: string }>`
  transition: 0.5s ease;
  stroke: var(--mantine-color-${({ $color }) => $color || "lime-4"});
  stroke-dasharray: calc(125 / 100 * ${({ $progress }) => $progress}), 200;
  stroke-linecap: round;
`;
