import { Group, Text } from "@mantine/core";
import { IconLockFilled } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

import { LabeledCard } from "../../../components/LabeledCard";

interface IProps {
  label: string;
}

export const LockedCard = ({ label, children }: PropsWithChildren<IProps>) => {
  return (
    <LabeledCard
      label={
        <Group gap={8} c="lime.4">
          <IconLockFilled size={14} />
          <Text fz={12} fw={700}>
            {label}
          </Text>
        </Group>
      }
    >
      <Group gap={10}>{children}</Group>
    </LabeledCard>
  );
};
