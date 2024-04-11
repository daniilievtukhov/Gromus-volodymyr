import { CloseButton, Group, Space, Stack, Text } from "@mantine/core";
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IProps {
  title?: string;
  description: ReactNode;
  onClose?: VoidFunction;
}

export const Info = ({ title, description, onClose }: IProps) => {
  return (
    <Stack ta="center" align="center" gap={6}>
      {onClose && (
        <CloseButton
          tabIndex={1}
          pos="absolute"
          left={20}
          top={20}
          bg="gray.7"
          radius="xl"
          size={30}
          icon={<IconArrowLeft />}
          onClick={onClose}
        />
      )}
      <Group gap={8}>
        <IconSparkles color="white" />
        <Text fw={600} c="white">
          Welcome to Copilot: GI
        </Text>
      </Group>
      <Space h={6} />
      {title && (
        <Text fz="sm" fw={500} c="white">
          {title}
        </Text>
      )}

      <Text
        component={typeof description === "string" ? "p" : "div"}
        fw={500}
        c="gray.5"
        ff="mono"
        w={280}
      >
        {description}
      </Text>
    </Stack>
  );
};
