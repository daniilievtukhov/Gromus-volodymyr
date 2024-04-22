import React from "react";
import { Pricing } from "./components/Pricing";
// import { NavBarPricing } from "./components/NavBarPricing";
// import { Footer } from "./components/FooterPricing";
import { Row } from "react-bootstrap";

export const PricingPage = () => {
  // const divStyle: React.CSSProperties = {
  //   height: "100vh",
  //   background: "#0D0D0E",
  //   overflowX: "hidden",
  //   width: "100%",
  //   margin: 0,
  //   fontFamily: "Manrope",
  //   paddingTop: "60px",
  // };

  return (
    <Row className="d-flex justify-content-around align-items-center">
      {/* <NavBarPricing /> */}
      <Pricing />
      {/* <Footer /> */}
    </Row>
  );
};
