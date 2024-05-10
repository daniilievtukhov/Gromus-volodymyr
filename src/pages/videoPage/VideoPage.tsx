import { Video } from "./components/Video";
import { Footer } from "../pricing/components/FooterPricing";
import { Stack } from "@mantine/core";

export const VideoPage = () => {
  return (
    <Stack>
      <Video />
      <Footer />
    </Stack>
  );
};
