import { Grid, Paper, Group } from "@mantine/core";
import styled from "styled-components";
import { SignedText, SubscribePackageBtn } from "../../pricing/components/Pricing";
import { useState, useEffect } from "react";
interface VideoProps {
  link: string;
}
export const Video: React.FC<VideoProps> = ({ link }) => {
  const VideoContainer = styled.div`
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  `;

  const [videoStyles, setVideoStyles] = useState({
    borderRadius: "16px",
    width: "1000px",
    height: "500px",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 414) {
        setVideoStyles({
          borderRadius: "16px",
          width: "300px",
          height: "150px",
        });
      } else if (window.innerWidth <= 1000) {
        setVideoStyles({
          borderRadius: "16px",
          width: "700px",
          height: "400px",
        });
      } else if (window.innerWidth <= 768) {
        setVideoStyles({
          borderRadius: "16px",
          width: "500px",
          height: "250px",
        });
      } else if (window.innerWidth <= 480) {
        setVideoStyles({
          borderRadius: "16px",
          width: "400px",
          height: "200px",
        });
      } else if (window.innerWidth <= 380) {
        setVideoStyles({
          borderRadius: "16px",
          width: "70px",
          height: "40px",
        });
      } else {
        setVideoStyles({
          borderRadius: "16px",
          width: "1000px",
          height: "500px",
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize once to set the initial styles
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Grid
      justify="center"
      style={{ backgroundColor: "#0D0D0E", overflowX: "hidden", overflowY: "hidden" }}
    >
      <Grid.Col style={{ backgroundColor: "#0D0D0E", overflowX: "hidden" }}>
        <Grid
          justify="center"
          align="center"
          style={{ margin: "30px", backgroundColor: "#0D0D0E" }}
        >
          <Group style={{ justifyContent: "center", backgroundColor: "#0D0D0E" }}>
            <div>
              <VideoContainer>
                <iframe src={link} allowFullScreen style={videoStyles} />
              </VideoContainer>
            </div>
          </Group>
        </Grid>
        <Grid justify="center" style={{ margin: "50px" }}>
          <Paper
            style={{
              textAlign: "center",
              justifyContent: "center",
              marginBottom: "10px",
              width: "40%",
              backgroundColor: "#0D0D0E",
            }}
          >
            {/*<SubscribePackageBtn>TRY IT NOW</SubscribePackageBtn>*/}
          </Paper>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};
