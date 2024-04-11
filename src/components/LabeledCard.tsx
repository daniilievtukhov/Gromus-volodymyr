import { Divider } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  label?: ReactNode;
}

export const LabeledCard = ({ label, children }: PropsWithChildren<IProps>) => {
  return (
    <Wrapper>
      <StyledDivider color="gray.9" label={label} />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 15px 12px;
  border: 0.8px solid var(--mantine-color-gray-9);
  border-top: none;
  position: relative;
`;

const StyledDivider: typeof Divider = styled(Divider)`
  position: absolute;
  left: 0;
  top: 0;
  translate: 0 calc(-50% + 0.4px);
  width: 100%;
`;
