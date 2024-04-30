import { IconHash } from "@tabler/icons-react";

import { AccentTitle } from "./AccentTitle";
import { Flag } from "./Flag";
import styled from "styled-components";

interface HashtagGroupsTitleProps {
  title: string;
  country?: string;
}

export const HashtagGroupsTitle: React.FC<HashtagGroupsTitleProps> = ({ title, country }) => (
  <AccentTitle icon={<IconHash />}>
    <AccentTitle.Color>Top Hashtag sets </AccentTitle.Color> used for
    <AccentTitle.Color> {title} </AccentTitle.Color> today
    {country && (
      <FlagWrap>
        <Flag code={country} />
      </FlagWrap>
    )}
  </AccentTitle>
);

const FlagWrap = styled.span`
  padding-left: 1rem;
  vertical-align: middle;
`;
