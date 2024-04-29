
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Grid, Paper } from "@mantine/core";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useEffect } from "react";

import { SignedText, SubscribePackageBtn } from "../../../pages/pricing/components/Pricing";

const CustomModal = styled(Modal)`
  .mantine-Modal-header {

    background: #0d0d0e;
  }
  .mantine-Modal-content {
    background: #0d0d0e;
  }


  .mantine-Paper-root {
    background: #0d0d0e;
  }

`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
`;

const StyledIFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ModalVideo = () => {

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (!opened) {
        open();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CustomModal size="75%" opened={opened} onClose={close} centered>
        <Paper style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2 style={{ fontSize: "48px" }}>Personalized Best Time & Day to Post</h2>
          <SignedText>Unlock AI-Powered Solution! Elevate Your Grow Potential Today.</SignedText>
        </Paper>

        <Grid justify="center" align="center" style={{ margin: "30px" }}>
          <Group style={{ justifyContent: "center" }}>
            <VideoContainer>
              <iframe
                src="https://www.loom.com/embed/1cf8b73bc30a413db3877cd3f27a0826?sid=db711b31-66a8-4b28-a64f-aee3ba57e5d3"
                frameBorder="0"
                allowFullScreen
                width="1000px"
                height="500px"
              />
            </VideoContainer>
          </Group>
        </Grid>
        <Grid justify="center" style={{ margin: "50px" }}>
          <Paper
            style={{
              textAlign: "center",
              justifyContent: "center",
              marginBottom: "10px",
              width: "40%",
            }}
          >
            {/* <SubscribePackageBtn>TRY IT NOW</SubscribePackageBtn> */}
          </Paper>
        </Grid>
      </CustomModal>
      {/* 
			<Group>
				<Button onClick={open}>Open centered Modal</Button>
			</Group> */}
    </>
  );
};

