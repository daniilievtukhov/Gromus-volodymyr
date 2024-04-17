import { Box, Flex, Text } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { isNil, isNull } from "lodash-es";
import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { percentFormat } from "../../../core/helpers/format";
import { formatShortNumber } from "../../../core/helpers/formatShortNumber";
import { useAIAuthorAnalyticStore } from "../store/accountAnalytic";
import { useLocation } from "react-router-dom";


type TileType = "first" | "second" | "third";

type TileProps = {
  title: ReactNode;
  subTitle?: ReactNode;
  value: number;
  header?: { label: string; value: number; percent?: number };
  type: TileType;
  authorId: string | number;
};

export const Tile = ({ subTitle, title, value, header, type, authorId }: TileProps) => {
  const id =  useAIAuthorAnalyticStore(state => state.authorId);
  const { pathname } = useLocation();
  return (
    <Root $type={type}>
      {header && (pathname==="/my-account-analytics" || authorId === id ) && (
        <Header>
          <Text fz={12} fw={500} c={"#7A7B81"} py={10} px={20}>
            {header.label}
          </Text>
          <Flex
            bg={header.value === 0 ? "#8C8C94" : header.value < 0 ? "#E7294B" : "#00BE6E"}
            align={"center"}
            py={10}
            px={20}
            justify={"center"}
          >
            <Text component="div" c={"#fff"} fz={12} fw={700}>
              <Flex>
                {header.value === 0 ? null : header.value < 0 ? (
                  <IconArrowDown size={16} />
                ) : (
                  <IconArrowUp size={16} />
                )}
                {[
                  formatShortNumber(header.value),
                  !isNil(header.percent) ? percentFormat(header.percent) : null,
                ]
                  .filter((el) => !isNil(el))
                  .join(" | ")}
              </Flex>
            </Text>
          </Flex>
        </Header>
      )}
      <Box px={20} py={16} pb={12}>
        <Flex align={"center"} justify={"space-between"} gap={8} wrap={"wrap"}>
          <Text fw={600} fz={14} c={"#BCBFC7"}>
            {title}
          </Text>
          {subTitle && (
            <Text fz={12} fw={500} c={"#7A7B81"}>
              {subTitle}
            </Text>
          )}
        </Flex>
        <Value>{formatShortNumber(value)}</Value>
      </Box>
    </Root>
  );
};

const Value = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: #f5f5f6;
`;

const Root = styled.div<{ $type: TileType }>`
  height: 100%;
  background: linear-gradient(0deg, #212122, #212122),
    linear-gradient(180deg, rgba(0, 224, 130, 0.06) 0%, rgba(0, 224, 130, 0) 61.54%);

  ${(p) =>
    p.$type === "second" &&
    css`
      background: #171718;

      ${Value} {
        color: #d6d8de;
        font-size: 30px;
      }
    `}

  ${(p) =>
    p.$type === "third" &&
    css`
      background: #121213;

      ${Value} {
        font-weight: 700;
        color: #b7b9be;
        font-size: 24px;
      }
    `}
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;
