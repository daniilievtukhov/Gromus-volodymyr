import { ActionIcon, AppShell, Box, Burger, Button, Flex, Menu, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBellFilled,
  IconLockFilled,
  IconSettingsFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import styled from "styled-components";

import { useGlobalStore } from "../../../globalStore";
import { useLogout } from "../../../hooks/useLogout";
import { toggleSideMenu, useLayoutStore } from "../../../layoutStore";
import { PremiumBanner } from "../../chat/components/PremiumBanner";
import { UserMenu } from "../../userMenu/UserMenu";
import { Navigation } from "./Navigation";

export const SideMenu = () => {
  const { userInfo } = useGlobalStore();
  const navbarOpened = useLayoutStore((s) => s.navbarOpened);
  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const logout = useLogout(userInfo.userName);

  // const deactivate = useMutation({
  //   mutationFn: ApiAccount.deactivate,
  //   onSuccess: () => {
  //     localStorage.removeItem("BEARER_TOKEN");
  //     navigate("/auth");
  //   },
  // });

  return (
    <Navbar p="lg">
      {!isMobile && (
        <AppShell.Section>
          <ActionIcon component="div" size="50" radius="xl" color="dark.7" onClick={toggleSideMenu}>
            <Burger opened={navbarOpened} />
          </ActionIcon>
        </AppShell.Section>
      )}

      {navbarOpened && <Navigation />}
      <AppShell.Section>
        <Stack gap="xs">
          {navbarOpened ? (
            <>
              {userInfo.trialUsed && <PremiumBanner mx={-20} />}
              <Button
                fullWidth
                h="50"
                justify="start"
                radius="xl"
                color="gray.6"
                variant="subtle"
                leftSection={<IconStarFilled />}
              >
                <Flex gap={16}>
                  Favorites
                  <Flex gap={6}>
                    <IconLockFilled size={16} color="#D1FD0A" />
                    <Text fz={12} fw={"bold"} c="#D1FD0A">
                      Soon
                    </Text>
                  </Flex>
                </Flex>
              </Button>
              <Button
                fullWidth
                h="50"
                justify="start"
                radius="xl"
                color="gray.6"
                variant="subtle"
                leftSection={<IconBellFilled />}
              >
                <Flex gap={16}>
                  Notifications
                  <Flex gap={6}>
                    <IconLockFilled size={16} color="#D1FD0A" />
                    <Text fz={12} fw={"bold"} c="#D1FD0A">
                      Soon
                    </Text>
                  </Flex>
                </Flex>
              </Button>
            </>
          ) : (
            <>
              <Box pos={"relative"}>
                <ActionIcon size="50" radius="xl" color="gray.6" variant="subtle">
                  <IconBellFilled />
                </ActionIcon>
                <Box pos={"absolute"} top={0} right={0}>
                  <IconLockFilled size={16} color="#D1FD0A" />
                </Box>
              </Box>
              <Menu position="right-end" shadow="md">
                <Menu.Target>
                  <ActionIcon size="50" radius="xl" color="gray.6" variant="subtle">
                    <IconSettingsFilled />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => {
                      console.log("LOGOUT");
                      logout.mutate();
                    }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}

          {!isMobile && <UserMenu expanded={navbarOpened} onLogout={logout.mutate} />}
        </Stack>
      </AppShell.Section>
    </Navbar>
  );
};

const Navbar = styled(AppShell.Navbar)`
  justify-content: space-between;

  @media (min-width: 768px) {
    background-color: #31323440;
  }

  /* background: rgba(49, 50, 52, 0.25); */
`;
