import { Modal, Group, Grid, Paper, Container, Text } from "@mantine/core";
import ReactPlayer from "react-player/lazy";
import styled from "styled-components";
import { SignedText, SubscribePackageBtn } from "../../../pages/pricing/components/Pricing";
import { closeVideoModalTutorial, useGlobalStore } from "../../../globalStore";
import { Circle, White } from "../../musicVideosModal/MusicVideosModal";
import { IconPlayerPlay } from "@tabler/icons-react";

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

const ResponsiveIframeContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ModalVideo = () => {
  const { opened, link, text, title } = useGlobalStore((s) => s.videosModalTutorial);

  return (
    <>
      <CustomModal
        size="75%"
        opened={opened}
        onClose={closeVideoModalTutorial}
        centered
        keepMounted={false}
        title={
          <Group c="lime.4" gap={10}>
            <Circle>
              <IconPlayerPlay size={14} strokeWidth={3} />
            </Circle>
            <Text fz={20} fw={"bold"} c={"#D1FD0A"}>
              How it <White>works</White>
            </Text>
          </Group>
        }
      >
        <Paper style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2 style={{ fontSize: "48px" }}>{title} </h2>
          <SignedText>{text}</SignedText>
        </Paper>

        <Grid justify="center" align="center" style={{ margin: "30px" }}>
          <Group style={{ justifyContent: "center" }}>
            <ResponsiveIframeContainer>
              <StyledIframe></StyledIframe>
            </ResponsiveIframeContainer>
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
            {/*<SubscribePackageBtn>TRY IT NOW</SubscribePackageBtn>*/}
          </Paper>
        </Grid>
      </CustomModal>
    </>
  );
};
