import { MantineStyleProp, Paper, Stack, Text, Title } from "@mantine/core";
import { ReactElement } from "react";

interface IProps {
  icon: ReactElement;
  title: string;
  description: string;
  style?: MantineStyleProp;
  className?: string;
}

export const Benefit = ({ icon, title, description, style, className }: IProps) => {
  return (
    <Paper p={20} radius={0} bg="rgba(49, 50, 52, .4)" style={style} className={className}>
      <Stack gap={4} c="lime.4">
        {icon}
        <Title order={2} c="white" fz={48}>
          {title}
        </Title>
        <Text mt={-12}>{description}</Text>
      </Stack>
    </Paper>
  );
};
