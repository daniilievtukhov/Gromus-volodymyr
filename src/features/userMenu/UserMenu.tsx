import { ActionIcon, Avatar, Flex, Stack, Text, Menu } from "@mantine/core";
import { IconLogout, IconSettingsFilled } from "@tabler/icons-react";

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
          {/* <ActionIcon size="50" radius="xl" color="gray.6" variant="subtle" onClick={onLogout}>
            <IconLogout />
          </ActionIcon> */}
          <Menu position="right-end" shadow="md">
            <Menu.Target>
              <ActionIcon size="50" radius="xl" color="gray.6" variant="subtle">
                <IconSettingsFilled />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={onLogout}>Logout</Menu.Item>
              <Menu.Item
                onClick={() => {
                  console.log("LOGOUT");
                  // logout.mutate();
                }}
              >
                Cancel Subscription
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </>
      )}
    </Flex>
  );
};
