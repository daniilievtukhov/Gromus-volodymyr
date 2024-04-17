import { Avatar, Badge, Box, Button, Divider, Flex, Stack, Text } from "@mantine/core";
import { IconChartAreaLineFilled } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { formatShortNumber } from "../../../../core/helpers/formatShortNumber";
import { ApiAuthorAnalytics } from "../../../../requests/authorAnalytics";
import { VerifiedLabel } from "../VerifiedLabel";

export const AuthorCard = ({ data }: { data: ApiAuthorAnalytics.Author }) => {
  return (
    <Wrapper>
      <Stack gap={12}>
        <Flex gap={10} align={"center"}>
          <Avatar size={40} />
          <Box>
            <Text fz={16} fw={600} c={"#fff"} lh={1.25} truncate="end">
              {data.nickname}
            </Text>
            <Text fz={14} fw={600} c={"#8E8F92"} lh={1.25} truncate="end">
              @{data.uniqueId}
            </Text>
          </Box>
        </Flex>

        <Flex justify={"space-between"}>
          {data.verified ? <VerifiedLabel /> : <div />}
          <Badge color="#EF6820" size="lg">
            {data.status}
          </Badge>
        </Flex>

        <Flex justify={"space-between"}>
          <Box>
            <Text fz={12} fw={500} c={"#7A7B81"}>
              Followers
            </Text>
            <Text fz={18} fw={700} c={"#fff"}>
              {formatShortNumber(data.subscribers)}
            </Text>
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <Text fz={12} fw={500} c={"#7A7B81"}>
              Likes
            </Text>
            <Text fz={18} fw={700} c={"#fff"}>
              {formatShortNumber(data.likes)}
            </Text>
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <Text fz={12} fw={500} c={"#7A7B81"}>
              Videos
            </Text>
            <Text fz={18} fw={700} c={"#fff"}>
              {formatShortNumber(data.clips)}
            </Text>
          </Box>
        </Flex>
        <NavLink to={"/account-analytics/" + data.authorId} style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            radius={"xl"}
            variant="filled"
            leftSection={<IconChartAreaLineFilled />}
            color="gray"
            h={40}
          >
            Show Report
          </Button>
        </NavLink>
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 280px;
  background-color: #212122;
  padding: 20px;
  padding-bottom: 10px;
`;
