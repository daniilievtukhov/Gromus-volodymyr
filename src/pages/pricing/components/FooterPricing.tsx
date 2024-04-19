import React from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { LogoGromus, DiscordIcon, InsIcon, SpotifyIcon } from "../../../assets/index";

import { btnDescription, subscribePackageBtn, separator } from "../components/Pricing";

const footerStyle: React.CSSProperties = {
  marginTop: "90px",
};

const footerLink: React.CSSProperties = {
  color: "#D1FD0A",
  textDecoration: "underline",
  cursor: "pointer",
};

export const Footer = () => {
  return (
    <Row style={footerStyle} className="d-flex justify-content-center px-5">
      <Col className="col-lg-4 col-md-4 col-sm-7 col-xs-10 mb-4">
        <Container>
          <Image className="" src={LogoGromus} height={30} width={170} />
          <label className="text-white py-3 w-100" style={btnDescription}>
            Sparks of inspiration are in every note.{" "}
          </label>
        </Container>
      </Col>

      <Col className="col-lg-4 col-md-4 col-sm-7 col-xs-10 mb-4">
        <Container>
          <Row>
            <Col className="flex-column text-white gap-2 col-lg-4 col-md-6 col-sm-10">
              <h6>SOLUTIONS</h6>
              <ul className="mb-3" style={{ listStyle: "none", padding: "0px" }}>
                <li className="mb-3">Use Cases</li>
              </ul>
            </Col>

            <Col className="flex-column text-white gap-2 col-lg-4 col-md-6 col-sm-10">
              <h6>COMPANY</h6>
              <ul className="mb-3" style={{ listStyle: "none", padding: "0px" }}>
                <li className="mb-3">Pricing</li>
                <li className="mb-3">Contact</li>
              </ul>
            </Col>

            <Col className="text-white gap-2 col-lg-4 col-md-6 col-sm-10">
              <h6>RESOURCES</h6>
              <ul className="mb-3" style={{ listStyle: "none", padding: "0px" }}>
                <li className="mb-3">Blog</li>
                <li className="mb-3">Privicy Policy</li>
                <li className="mb-3">Cookie Policy</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Col>

      <Col className="text-center col-lg-4 col-md-4 col-sm-7 col-xs-10 mb-4">
        <h5 className="text-white m-3">Are you an artist?</h5>
        <a className="m-3" style={footerLink}>
          Work with us as an artist
        </a>
        <Button className="text-black px-5 py-2" style={subscribePackageBtn}>
          SUBMIT
        </Button>

        <Row className="d-flex flex-row align-items-center justify-content-center mt-5">
          <Col className="p-0 col-lg-1 col-2">
            <Image src={InsIcon} />
          </Col>

          <Col className="p-0  col-lg-1 col-2">
            <Image src={SpotifyIcon} />
          </Col>

          <Col className="p-0  col-lg-1 col-2">
            <Image src={DiscordIcon} />
          </Col>
        </Row>
      </Col>
      <hr style={separator} />

      <Row className="mb-5 text-white text-center">
        <Col className="col-md-3 col-10 mb-3">
          <label>Copyright © 2024 Gromus, Inc</label>
        </Col>

        <Col className="col-md-6 col-10">
          <label>
            Gromus, Inc is not affiliated with or endorsed by TikTok© Inc. or ByteDance© Ltd. <br />
            All product and company names are registered trademarks of their original owners
          </label>
        </Col>
      </Row>
    </Row>
  );
};
