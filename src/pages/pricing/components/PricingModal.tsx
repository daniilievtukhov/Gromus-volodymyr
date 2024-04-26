import React, { useEffect, useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
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

export function PricingModal() {
  const store = pricingModal()

  const [opened, setOpened] = useState<boolean>(store.modalState);

  useEffect(() => {
    console.log("Effect!");
    console.log(opened);
    setOpened(store.modalState);
  }, [store])

  return (
    <>
      <CustomModal
        opened={opened}
        onClose={() => store.closeModal()}
        size="100%"
        style={{
          backgroundColor: "#0D0D0E",
        }}
      >
        <Pricing showFooter={false} />
      </CustomModal>

      {/* <Group>
				<Button onClick={() => setOpened(true)}>Open Modal</Button>
			</Group> */}
    </>
  );
}
