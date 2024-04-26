import React from "react";
import { Pricing } from "./components/Pricing";
import { NavBarPricing } from "./components/NavBarPricing";
import { Footer } from "./components/FooterPricing";
import { Row } from "react-bootstrap";

export const PricingPage = () => {

  return (
    <Row>
      <NavBarPricing />
      <Pricing />
    </Row>
  );
};