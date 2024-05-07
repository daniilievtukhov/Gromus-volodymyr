import { useEffect, useState } from "react";
import { Modal, CloseButton, Flex } from "@mantine/core";
import { Pricing } from "./Pricing";
import styled from "styled-components";
import { pricingModal } from "../hooks/triggerPricingModalHook";

const CustomModal = styled(Modal)`
  .mantine-Modal-header {
    background: #0d0d0e;
  }
  .mantine-Modal-content {
    background: #0d0d0e;
  }

  .mantine-Modal-close {
    background-color: #d1fd0a;
    color: black;
    border: none;
    border-radius: 8px;
    width: 45px;
    height: 40px;
    padding: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .mantine-Modal-close:hover {
    background-color: #d1fd0b;
  }
`;

const CustomTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 24px;
  text-align: center;
`;

const FlexContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;

export function PricingModal() {
  const store = pricingModal();
  const [opened, setOpened] = useState<boolean>(store.modalState);

  useEffect(() => {
    setOpened(store.modalState);
  }, [store]);

  return (
    <>
      <CustomModal
        opened={opened}
        onClose={() => store.closeModal()}
        withCloseButton={false}
        size="100%"
        style={{
          backgroundColor: "#0D0D0E",
        }}
      >
        <FlexContainer>
          <p></p>
          <CustomTitle>Select your plan to enjoy more from GROMUS AI</CustomTitle>
          <CloseButton className="mantine-Modal-close" onClick={() => store.closeModal()} />
        </FlexContainer>
        <Pricing showFooter={false} showText={false} />
      </CustomModal>
    </>
  );
}
