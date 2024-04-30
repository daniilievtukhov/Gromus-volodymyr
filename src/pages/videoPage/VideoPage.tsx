import React from "react";
import { Row } from "react-bootstrap";
import { Video } from "./components/Video";
import { Footer } from "../pricing/components/FooterPricing";

export const VideoPage = () => {

  return (
    <Row>
      <Video />
      <Footer />
    </Row>
  );
};