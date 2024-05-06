import React from "react";

import { Video } from "./components/Video";
import { Footer } from "../pricing/components/FooterPricing";
import { Flex, Stack } from "@mantine/core";
import {} from "react-bootstrap";

export const VideoPage = () => {
  return (
    <Stack>
      <Video />
      <Footer />
    </Stack>
  );
};
