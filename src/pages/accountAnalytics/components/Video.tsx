import { Button, Text } from "@mantine/core";
import { IconChartAreaLineFilled } from "@tabler/icons-react";
import { ReactNode } from "react";
import styled from "styled-components";

export const Video = ({
  cover,
  icon,
  label,
  value,
}: {
  cover: string;
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
}) => {
  return (
    <Wrapper $image={cover}>
      <Header>
        <IconWrapper>{icon}</IconWrapper>
        <Info>
          <Text fz={13} fw={600} c={"#BCBFC7"} truncate={"end"} miw={0}>
            {label}
          </Text>
          <Text lh={1} fz={20} fw={700} c={"#fff"}>
            {value}
          </Text>
        </Info>
      </Header>

      <Footer>
        <Button
          radius={"xl"}
          variant="filled"
          leftSection={<IconChartAreaLineFilled />}
          color="gray"
          h={40}
        >
          Show Report
        </Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $image: string }>`
  height: 295px;
  max-width: 200px;
  background-image: url(${(p) => p.$image});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const IconWrapper = styled.div`
  background-color: #d1fd0a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  width: 40px;
  height: 50px;
  flex-shrink: 0;
`;

const Header = styled.div`
  display: flex;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  min-width: 0;
`;
