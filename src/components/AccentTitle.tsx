import { Group, Title } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  icon?: ReactNode;
  image?: string;
}

const _AccentTitle = ({ image, icon, children }: PropsWithChildren<IProps>) => (
  <Group c="lime.4" gap={10} wrap="nowrap" align="start" mt={10} mb={10}>
    <span>{icon}</span>
    {image && <img src={image} />}
    <Title order={2} fz="20px" c="white">
      {children}
    </Title>
  </Group>
);

const Color = styled.span`
  color: var(--mantine-color-lime-4);
`;

export const AccentTitle = Object.assign(_AccentTitle, { Color });
