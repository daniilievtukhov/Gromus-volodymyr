import {
  Alert,
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Flex,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconInfoCircle, IconMoodSad } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { isNil } from "lodash-es";
import qs from "qs";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { tiktokSvg } from "../../assets";
import { getToken } from "../../core/helpers/getToken";
import { useGlobalStore } from "../../globalStore";
import { AuthorRisingSounds } from "./components/AuthorRisingSounds";
import { Categories } from "./components/Categories";
import { Competitors } from "./components/competitors/Competitors";
import { Header } from "./components/Header";
import { RecommendationMap } from "./components/RecommendationMap";
import { Statistics } from "./components/Statistics";
import { TopVideos } from "./components/TopVideos";
import { useAuthorAnalyticsData } from "./hooks/useAuthorAnalyticsData";
import { useAIAuthorAnalyticStore } from "./store/accountAnalytic";
import { useLocation } from "react-router-dom";
import { AuthorGraphicStates } from "./components/graphicСhart/AuthorGraphicStates";

const Content = ({ authorId }: { authorId: number | string }) => {
  const { isError, error, isSuccess } = useAuthorAnalyticsData(authorId);
  const store = useAIAuthorAnalyticStore();
  const [id, setId] = useState<undefined | string | number>();
  const { pathname } = useLocation();

  useEffect(() => {
    setId(store.authorId);
  }, [store]);

  if (isError) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return (
        <Stack align="center" justify="center" p={32} pb={102} gap={52} bg="#0D0D0E" mih="100vh">
          <Alert variant="light" color="orange" title="Account not found" icon={<IconMoodSad />}>
            We currently do not have data for this account. They will appear soon.
          </Alert>
        </Stack>
      );
    } else {
      if (isAxiosError(error) && error.response?.status === 403) {
        return (
          <Stack align="center" justify="center" style={{ height: "100vh" }}>
            You're over your limit
          </Stack>
        );
      }
      return (
        <Flex align="center" justify="center">
          <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
            Something went wrong. We are working on getting this fixed as soon as we can.
          </Alert>
        </Flex>
      );
    }
  }

  return (
    <Stack p={32} pb={102} gap={52} bg="#0D0D0E" mih="100vh">
      <Header authorId={authorId} />
      {(id === authorId || pathname === "/my-account-analytics") && (
        <Categories authorId={authorId} />
      )}
      <Statistics authorId={authorId} />
      {(id === authorId || pathname === "/my-account-analytics") && (
        <Competitors authorId={authorId} />
      )}
      <TopVideos authorId={authorId} />
      <AuthorRisingSounds authorId={authorId} />
      <AuthorGraphicStates authorId={authorId} />
      <RecommendationMap authorId={authorId} />
    </Stack>
  );
};

export const AccountAnalyticsPage = memo(() => {
  const { authorId } = useParams();

  if (!authorId) return null;

  return <Content authorId={authorId} />;
});

export const MyAccountAnalyticsPage = memo(() => {
  const authorId = useGlobalStore((s) => s.userInfo.authorId);
  const [id, setId] = useState<undefined | string | number>();
  const store = useAIAuthorAnalyticStore();
  const { pathname } = useLocation();

  useEffect(() => {
    setId(store.authorId);
  }, [store]);

  if ((isNil(id) || pathname === "/my-account-analytics") && isNil(authorId)) {
    return (
      <Stack align="center" justify="center" style={{ height: "100vh" }}>
        <Text>
          To receive personalized analytics of your account, please authorize with your TikTok
          account😌
        </Text>
        <Text>
          We use official authorization method and do not store or have access to your personal
          information and
        </Text>
        <Text>passwords</Text>
        <StyledButton
          component="a"
          href={`//pro.gromus.ai/api/accountapi/gromusbridge${qs.stringify(
            {
              token: getToken(),
              targetUrl: "/Account/TikTokAuth",
            },
            { addQueryPrefix: true },
          )}`}
          leftSection={<Image w={24} src={tiktokSvg} />}
        >
          Sign-in with TikTok
        </StyledButton>
        <Text>Find out analytics on any creator by entering their username</Text>
      </Stack>
    );
  }
  return <Content authorId={authorId || ""} />;
});

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(styled(Button).attrs({
  size: "lg",
  variant: "white",
})<ButtonProps>`
  font-size: var(--mantine-font-size-xs);
  font-weight: 700;
  color: black;
`);
