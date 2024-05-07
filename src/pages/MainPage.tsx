import { useEffect, useState } from "react";
import {
  ActionIcon,
  Alert,
  AppShell,
  Avatar,
  Box,
  Burger,
  Flex,
  Tooltip,
  Stack,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBolt, IconInfoCircle, IconMoodSad } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { curvesBg } from "../assets";
import { Chat } from "../features/chat";
import { MusicVideosModal } from "../features/musicVideosModal/MusicVideosModal";
import { PricingModal } from "./pricing/components/PricingModal";
import { SideMenu } from "../features/sideMenu";
import { UserMenu } from "../features/userMenu/UserMenu";
import { useGlobalStore } from "../globalStore";
import { useLogout } from "../hooks/useLogout";
import { setChatOpened, toggleSideMenu, useLayoutStore, setNavbarOpened } from "../layoutStore";
import { pricingModal } from "./pricing/hooks/triggerPricingModalHook";
import { ModalVideo } from "../features/greeting/components/ModalVideo";
import { ApiAccount } from "../requests/account/settings";
import { useUserSettingsStore } from "../features/userSettings/store/user";
import { isAxiosError } from "axios";
import { StyledButtonLogIn } from "../features/auth/components/AuthLogIn";

export const MainPage = () => {
  const { navbarOpened, chatOpened, showAlert } = useLayoutStore();
  const userInfo = useGlobalStore((s) => s.userInfo);
  const logout = useLogout(userInfo.userName);
  const store = useGlobalStore();
  const [opened, setOpened] = useState<boolean>(false);
  const pricing = pricingModal();
  const { limit } = store;
  const mockLim = 0;
  const setUserRole = useUserSettingsStore((s) => s.setUserRole);
  const userRole = useUserSettingsStore((s) => s.userRole);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiAccount.getUserSettings();
        setUserRole(res.accessRole.toUpperCase());
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          return (
            <Stack
              align="center"
              justify="center"
              p={32}
              pb={102}
              gap={52}
              bg="#0D0D0E"
              mih="100vh"
            >
              <Alert
                variant="light"
                color="orange"
                title="Account not found"
                icon={<IconMoodSad />}
              >
                "I noticed that you are not logged in or something happened with your authorization.
                In order to continue our work together , please try to log in one more time."
                <StyledButtonLogIn
                  tabIndex={5}
                  type="submit"
                  onClick={() => {
                    navigate("/auth");
                  }}
                >
                  Log In
                </StyledButtonLogIn>
              </Alert>
            </Stack>
          );
        } else {
          return (
            <Flex align="center" justify="center">
              <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
                Something went wrong. We are working on getting this fixed as soon as we can.
              </Alert>
            </Flex>
          );
        }
      }
    })();
  }, []);
  useEffect(() => {
    setChatOpened(true);
    setNavbarOpened(true);
  }, []);

  useEffect(() => {
    if (!mockLim && !opened) {
      setOpened(true);
    }
  }, [mockLim, opened]);

  const isMobile = useMediaQuery(`(max-width: 768px)`);

  return (
    <>
      <PricingModal />
      <StyledShell
        withBorder={false}
        navbar={{
          width: navbarOpened ? 290 : 90,
          breakpoint: "sm",
          collapsed: { mobile: !navbarOpened },
        }}
        aside={{
          width: 360,
          breakpoint: "sm",
          collapsed: { mobile: !chatOpened, desktop: !chatOpened },
        }}
        header={{
          height: 65,
          collapsed: !isMobile,
        }}
      >
        <StyledHeader>
          <Flex justify={"space-between"} px={16} align={"center"} h={65}>
            <ActionIcon
              component="div"
              size="50"
              radius="xl"
              color="dark.7"
              onClick={toggleSideMenu}
            >
              <Burger opened={navbarOpened} />
            </ActionIcon>

            <UserMenu expanded={true} onLogout={logout.mutate} />
          </Flex>
        </StyledHeader>
        <SideMenu />
        <Chat />
        <AppShell.Main>
          <Outlet context={{ userInfo }} />
        </AppShell.Main>
      </StyledShell>
      {!chatOpened && (
        <Tooltip label={"Open AI Assistant Beta"} position="left">
          <StyledBox>
            <Avatar
              radius="xl"
              size={60}
              bg="lime.4"
              color="#000"
              onClick={() => setChatOpened(true)}
            >
              <IconBolt />
            </Avatar>
          </StyledBox>
        </Tooltip>
      )}
      <MusicVideosModal />

      <ModalVideo />
      {showAlert && (
        <StyledAlert
          variant="filled"
          withCloseButton
          onClose={() => useLayoutStore.setState({ showAlert: false })}
          autoContrast
        >
          Gromus works in Demo Mode. Every week we will improve and add new functionality to our AI
          Copilot GI
        </StyledAlert>
      )}
    </>
  );
};

const waveAnimation = keyframes`
  0% {
    background-size: 100% 100%;
  }
  50% {
    background-size: 200% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
`;

const StyledAlert = styled(Alert)`
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #d1fd0a;
  text-align: center;
`;

const StyledHeader = styled(AppShell.Header)`
  background-color: #000;
`;

const StyledShell = styled(AppShell)`
  background-color: #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${curvesBg});

  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: ${waveAnimation} 30s linear infinite;
`;

const StyledBox = styled(Box)`
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 1000;
  cursor: pointer;
`;
