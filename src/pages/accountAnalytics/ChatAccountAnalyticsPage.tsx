import {
  Alert,
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconInfoCircle, IconMoodSad } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { isNil } from "lodash-es";
import qs from "qs";
import { memo } from "react";
import styled from "styled-components";

import { tiktokSvg } from "../../assets";
import { getToken } from "../../core/helpers/getToken";
import { useGlobalStore } from "../../globalStore";
import { Categories } from "./components/Categories";
import { Competitors } from "./components/competitors/Competitors";
import { Header } from "./components/Header";
import { RecommendationMap } from "./components/RecommendationMap";
import { Statistics } from "./components/Statistics";
import { TopVideos } from "./components/TopVideos";
import { useAuthorAnalyticsData } from "./hooks/useAuthorAnalyticsData";

const Content = ({ authorId }: { authorId: number | string }) => {
  const { isError, error } = useAuthorAnalyticsData(authorId);

  if (isError) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return (
        <Stack p={32} pb={102} gap={52} bg="#0D0D0E" mih="100vh">
          <Alert variant="light" color="orange" title="Account not found" icon={<IconMoodSad />}>
            We currently do not have data for this account. They will appear soon.
          </Alert>
        </Stack>
      );
    } else {
      return (
        <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
          Something went wrong. We are working on getting this fixed as soon as we can.
        </Alert>
      );
    }
  }

  return (
    <Stack p={32} pb={102} gap={52} bg="#0D0D0E" mih="100vh">
      <Header authorId={authorId} />

      <Statistics authorId={authorId} />
      <Competitors authorId={authorId} />
      <TopVideos authorId={authorId} />

      <RecommendationMap authorId={authorId} />
    </Stack>
  );
};

export const ChatAccountAnalyticsPage = memo(() => {
  const authorId = useGlobalStore((s) => s.userInfo.authorId);

  if (isNil(authorId)) {
    return (
      <Stack align="center" justify="center" style={{ height: "100vh" }}>
        <Text>Please, sign in with TikTok to analyze your account</Text>
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
      </Stack>
    );
  }

  return <Content authorId={authorId} />;
});

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(styled(Button).attrs({
  size: "lg",
  variant: "white",
})<ButtonProps>`
  font-size: var(--mantine-font-size-xs);
  font-weight: 700;
  color: black;
`);
