import * as Flags from "mantine-flagpack";
import styled from "styled-components";

interface IProps {
  code: string;
}

export const Flag = ({ code }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Icon = Flags[`${code}Flag`];

  if (!Icon) return <Box>{code}</Box>;

  return <Icon w={24} radius={0} />;
};

const Box = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 18px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.15);
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  vertical-align: middle;
`;
