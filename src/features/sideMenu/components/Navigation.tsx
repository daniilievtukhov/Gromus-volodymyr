import { Accordion, AppShell, Box, Button, Flex, ScrollArea, Stack, Tooltip } from "@mantine/core";
import {
  IconBrandTiktokFilled,
  IconChartPieFilled,
  IconLayoutDashboardFilled,
  IconLockFilled,
  IconRadiusBottomLeft,
  IconStarsFilled,
} from "@tabler/icons-react";
import qs from "qs";
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { getToken } from "../../../core/helpers/getToken";

type MenuItem = {
  label: string;
  icon: JSX.Element;
  id: string;
  children: MenuItemChild[];
};

type MenuItemChild = {
  label: string;
  link: string;
  isComing?: boolean;
};

export const Navigation = () => {
  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        label: "AI Dashboard",
        icon: <IconStarsFilled />,
        id: "ai",
        children: [
          { label: "Time to Post", link: "/time-to-post" },
          { label: "Account Analytics", link: "/my-account-analytics" },
          { label: "Hashtags", link: "/hashtags" },
          { label: "Sound Analytics", link: "/sound-analytics", isComing: true },
          { label: "Performance", link: "/performance", isComing: true },
          { label: "Collaborations", link: "/collaborations", isComing: true },
          { label: "Reports", link: "/reports", isComing: true },
          { label: "Pricing", link: "/pricing" },
        ],
      },
      {
        label: "TikTok Dashboard",
        icon: <IconBrandTiktokFilled />,
        id: "tiktok",
        children: [
          { label: "Rising Sounds", link: "/rising-sounds" },
          { label: "Top Videos", link: "/top-videos", isComing: true },
          { label: "Creators", link: "/creators", isComing: true },
        ],
      },
      {
        label: "Music Dashboard",
        icon: <IconLayoutDashboardFilled />,
        id: "music",
        children: [
          { label: "To-Do Plan", link: "to-do-plan", isComing: true },
          { label: "Personalized Playlists", link: "/personalized-playlists", isComing: true },
          { label: "Bot Detection", link: "/bot-detection", isComing: true },
        ],
      },
    ],
    [],
  );

  const [defaultValue] = useState(
    menuItems.find((item) =>
      item.children.some((el) => window.location.pathname.startsWith(el.link)),
    )?.id,
  );

  return (
    <AppShell.Section pt={16} style={{ height: "100%" }} component={ScrollArea}>
      <Accordion
        defaultValue={defaultValue}
        chevron={null}
        styles={{
          icon: {
            color: "#fff",
          },
          label: {
            fontWeight: "bold",
            color: "#fff",
          },
          control: {
            borderRadius: "100px",
          },
          item: {
            border: "none",
          },
        }}
      >
        {menuItems.map((el) => (
          <Accordion.Item key={el.id} value={el.id}>
            <Accordion.Control icon={el.icon}>{el.label}</Accordion.Control>
            <Accordion.Panel>
              <Stack gap={8} pl={10} align="flex-start">
                {el.children.map((child, indx) => (
                  <MenuItem key={indx} data={child} />
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}

        <Button
          component="a"
          href={`//pro.gromus.ai/api/accountapi/gromusbridge${qs.stringify(
            {
              token: getToken(),
              targetUrl: "/DashBoard",
            },
            { addQueryPrefix: true },
          )}`}
          target="_blank"
          fullWidth
          justify="flex-start"
          leftSection={<IconChartPieFilled />}
          variant="subtle"
          radius={"xl"}
          color={"#fff"}
          size={"lg"}
        >
          Pro Statistics
        </Button>
      </Accordion>
    </AppShell.Section>
  );
};

const MenuItem = ({ data }: { data: MenuItemChild }) => {
  return (
    <Flex align={"center"} gap={4}>
      <Box top={-2} pos={"relative"} c={"#4A4A4A"}>
        <IconRadiusBottomLeft size={18} />
      </Box>

      {data.isComing ? (
        <Tooltip
          disabled={!data.isComing}
          label={"This feature will be available soon"}
          withArrow
          position="right"
          openDelay={200}
        >
          <Button
            styles={{
              root: {
                height: "auto",
                padding: "4px 8px",
              },
              label: {
                textAlign: "left",
                textDecoration: "none",
                whiteSpace: "pre-wrap",
              },
            }}
            variant={"subtle"}
            color={"#b4b4b4"}
            autoContrast
            size="compact-sm"
            rightSection={
              <Flex gap={4}>
                <IconLockFilled size={14} color="#D1FD0A" />
              </Flex>
            }
          >
            {data.label}
          </Button>
        </Tooltip>
      ) : (
        <NavLink to={data.link}>
          {({ isActive }) => (
            <Button
              styles={{
                root: {
                  height: "auto",
                  padding: "4px 8px",
                },
                label: {
                  textAlign: "left",
                  textDecoration: "none",
                  whiteSpace: "pre-wrap",
                },
              }}
              variant={isActive ? "filled" : "subtle"}
              color={isActive ? "#D1FD0A" : "#fff"}
              autoContrast
              size="compact-sm"
            >
              {data.label}
            </Button>
          )}
        </NavLink>
      )}
    </Flex>
  );
};
