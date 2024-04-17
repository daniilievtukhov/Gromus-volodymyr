import { ActionIcon, Avatar, Flex, Stack, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

import { useGlobalStore } from "../../globalStore";

export const UserMenu = ({ expanded, onLogout }: { expanded?: boolean; onLogout: () => void }) => {
  const { userInfo } = useGlobalStore();

  return (
    <Flex gap={10}>
      <Avatar radius="xl" size={50} />
      {expanded && (
        <>
          <Stack gap={0} w={130}>
            <Text truncate="end" fz={16} fw={"bold"} c="white">
              {userInfo.firstname}
            </Text>
            <Text truncate="end" fz={14} fw={600} c={"#8E8F92"}>
              {userInfo.userName}
            </Text>
          </Stack>
          <ActionIcon size="50" radius="xl" color="gray.6" variant="subtle" onClick={onLogout}>
            <IconLogout />
          </ActionIcon>
        </>
      )}
    </Flex>
  );
};
