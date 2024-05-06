import { Box, BoxProps, Button, Stack, Text } from "@mantine/core";
import { useGlobalStore } from "../../../../src/globalStore";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { pricingModal } from "../../../pages/pricing/hooks/triggerPricingModalHook";

export const PremiumBanner = (props: BoxProps) => {
  const store = useGlobalStore() as { limit: number };
  // const [click, setClick] = useState<boolean>(false);
  const pricing = pricingModal();

  // const handleClickPremium = () => {
  //   render: <PricingModal />;
  // };

  const [limit, setLimit] = useState<number>();
  useEffect(() => {
    setLimit(store.limit);
  }, [store]);

  return (
    <Wrapper {...props}>
      {/* {click && (
        <>
          <PricingModal />
        </>
      )} */}

      <Stack gap="sm">
        <Stack gap={3}>
          <Text fz="xs" lh="xs" fw="600" c="#6F8800">
            Free Plan
          </Text>
          <Text lh="xs" fw="700" c="#000">
            There are {limit} free requests left
          </Text>
        </Stack>
        <StyledButton
          variant="filled"
          color="#000"
          size="xs"
          component="a"
          onClick={() => pricing.openModal()}
          target="_blank"
        >
          Upgrade Your Plan
        </StyledButton>
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: #d1fd0a;
  padding: 20px;
`;

const StyledButton: typeof Button = styled(Button)`
  font-size: 14px;
  font-weight: 700;
  width: min-content;
  border-radius: 5px;
`;
