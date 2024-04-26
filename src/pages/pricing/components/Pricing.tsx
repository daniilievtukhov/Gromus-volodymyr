
import React from "react";
import styled from "styled-components";
import { Grid, Button } from "@mantine/core";
import { Footer } from "./FooterPricing";

import Check from "../../../assets/icons/check.svg";
import Close from "../../../assets/icons/close.svg";

import { useLocation } from "react-router-dom";

const PricingContainer = styled.div`
  color: white;
  margin: auto;
  text-align: center;
`;

const PricingHeader = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
`;

const BasicLabel = styled.label`
  font-weight: 700;
  font-size: 18px;
`;

const FreeLabel = styled.label`
  font-weight: 500;
  font-size: 40px;
  color: #d1fd0a;
`;

const Separator = styled.hr`
  color: rgba(255, 255, 255, 0.05);
  height: 2px;
`;

const CardContainer = styled.div`
  border-radius: 16px;
`;

const SignedText = styled.label`
  color: #d1fd0a;
`;

const ComingSoon = styled.label`
  color: #d1fd0a;
  background: rgba(209, 253, 10, 0.05);
  padding: 8px;
  border-radius: 16px;
  font-size: 13px;
  text-wrap: nowrap;
`;

const FreePackageBtn = styled(Button)`
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.04);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 12%;
    width: 90%;
    height: 60px;
    border-radius: 8px;
    margin-bottom: 10px;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.1);
`;

export const SubscribePackageBtn = styled(Button)`
  background: #d1fd0a;
  border-color: #d1fd0a;
  color: black;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 12%;
  width: 90%;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 10px;

  &:hover {
    background: #d1fd0b;
    border-color: #d1fd0a;
    color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const BtnDescription = styled.label`
  color: #cbcbcb;
  font-weight: 400;
  font-size: 14px;
  padding-top: 5px;
`;

const CustomBudgetColor = styled.span`
  color: #d1fd0a;
`;

const comingSoonStyle: React.CSSProperties = {
  color: "#D1FD0A",
  background: "rgba(209, 253, 10, 0.05)",
  padding: "8px",
  borderRadius: "16px",
  fontSize: "13px",
  textWrap: "nowrap",
};

const cardBgContainer: React.CSSProperties = {
  position: "relative",
};

const cardBgContainerAfter: React.CSSProperties = {
  content: "",
  position: "absolute",
  top: "20%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  maxWidth: "400px",
  maxHeight: "400px",
  background: "radial-gradient(circle at center, rgba(209, 253, 10, 0.05) 15%, transparent 100%)",
  borderRadius: "50%",
  filter: "blur(5px)",
  zIndex: 1,
};

const cardBgContainerRight: React.CSSProperties = {
  position: "relative",
};

const cardBgContainerRightAfter: React.CSSProperties = {
  content: "",
  position: "absolute",
  top: "80%",
  left: "20%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  maxWidth: "400px",
  maxHeight: "400px",
  background: "radial-gradient(circle at center, rgba(209, 253, 10, 0.05) 25%, transparent 100%)",
  borderRadius: "50%",
  filter: "blur(5px)",
  zIndex: 1,
};

const PackageCardContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 16px;
  padding: 20px;
  z-index: 1;
`;

const CustomBudget = ({ text }: { text: string }) => {
  return (
    <label style={comingSoonStyle} className="mx-1">
      {" "}
      {text}{" "}
    </label>
  );
};


export const Pricing = ({ showFooter = true }) => {
  const basicPackage = [
    { image: Check, signedText: "10 questions", text: "AI Copilot GI", comingSoon: false },

    {
      image: Close,
      signedText: "",
      text: "AI Personalized Best Time & Day to Post",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "3 times",
      text: "AI Personalized Account Analytics",
      comingSoon: false,
    },
    { image: Check, signedText: "3 times", text: "TikTok Any Account Insights", comingSoon: false },
    { image: Close, signedText: "", text: "AI Personalized Hashtags", comingSoon: false },
    { image: Close, signedText: "", text: "Trending Hashtags", comingSoon: true },
    {
      image: Check,
      signedText: "3 times",
      text: "TikTok Viral Sounds for any Territories",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "3 times/day",
      text: "data access at Pro Platform",
      comingSoon: false,
    },

    { image: Close, signedText: "", text: "AI To-Do Artist Plan", comingSoon: true },
    { image: Close, signedText: "", text: "Spotify AI Analytics", comingSoon: true },
    { image: Close, signedText: "", text: "Your Song AI Analytics", comingSoon: true },
  ];

  const proPackage = [
    { image: Check, signedText: "300 questions", text: "AI Copilot GI", comingSoon: false },

    {
      image: Check,
      signedText: "20 times",
      text: "AI Personalized Best Time & Day to Post",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "20 times",
      text: "AI Personalized Account Analytics",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "20 times",
      text: "of TikTok Any Account Insights",
      comingSoon: false,
    },
    { image: Close, signedText: "", text: "AI Personalized Hashtags", comingSoon: false },
    {
      image: Check,
      signedText: "20 times",
      text: "of Trending Hashtags for any Territories",
      comingSoon: true,
    },
    {
      image: Check,
      signedText: "20 times",
      text: "TikTok Viral Sounds for any Territories",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "20 times/day",
      text: "data access at Pro Platform",
      comingSoon: false,
    },

    { image: Check, signedText: "", text: "AI To-Do Artist Plan", comingSoon: true },
    { image: Check, signedText: "", text: "Spotify AI Analytics", comingSoon: true },
    { image: Check, signedText: "2 times", text: "Your Song AI Analytics", comingSoon: true },
  ];


  const advancedPackage = [
    { image: Check, signedText: "1000 questions", text: "AI Copilot GI", comingSoon: false },
    {
      image: Check,
      signedText: "Unlimited",
      text: "AI Personalized Best Time & Day to Post",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "Unlimited",
      text: "AI Personalized Account Analytics",
      comingSoon: false,
    },
    {
      image: Check,
      signedText: "Unlimited",
      text: "TikTok Any Account Insights",
      comingSoon: false,
    },
    { image: Check, signedText: "", text: "AI Personalized Hashtags", comingSoon: false },
    {
      image: Check,
      signedText: "Unlimited",
      text: "Trending Hashtags for any Territories",
      comingSoon: true,
    },
    {
      image: Check,
      signedText: "Unlimited",
      text: "TikTok Viral Sounds for any Territories",
      comingSoon: false,
    },

    { image: Check, signedText: "Unlimited", text: "Pro Platform", comingSoon: false },
    { image: Check, signedText: "", text: "AI To-Do Artist Plan", comingSoon: true },
    { image: Check, signedText: "", text: "Spotify AI Analytics", comingSoon: true },
    { image: Check, signedText: "5 times", text: "Your Song AI Analytics", comingSoon: true },
  ];


  const renderPackageItems = ({
    arr,
  }: {
    arr: { image: string; signedText: string; text: string; comingSoon: boolean }[];
  }) => {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
        {arr.map(
          (
            item: { image: string; signedText: string; text: string; comingSoon: boolean },
            index: number,
          ) => (
            <li key={index} style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <img height={24} src={item.image} style={{ marginRight: "10px" }} />
              <div style={{ marginRight: "10px" }}>
                <label style={{ color: " #D1FD0A", paddingRight: "5px" }}>{item.signedText}</label>
                {item.text}
              </div>
              {item.comingSoon && <CustomBudget text="coming soon" />}
            </li>
          ),
        )}

      </ul>
    );
  };

  const location = useLocation();


  const isPricingPage = location.pathname === "/pricing";


  return (
    <PricingContainer
      style={{


        marginBottom: "60px",
        alignItems: "center",
        backgroundColor: "#0D0D0E",
        height: "100vh",
      }}
    >
      <h2>Select your plan to enjoy more from GROMUS AI</h2>

      <SignedText className="text-center">
        Unlock AI-Powered Solution! Elevate Your Grow Potential Today.
      </SignedText>

      <Grid
        style={{
          padding: "30px",
          paddingBottom: "100px",
          backgroundColor: "#0D0D0E",
        }}
        justify="center"
      >
        <Grid.Col span={{ base: 12, md: 8, lg: 4 }}>
          <PackageCardContainer>
            <div style={cardBgContainer}>
              <PricingHeader>
                <BasicLabel>BASIC</BasicLabel>
                <FreeLabel>FREE</FreeLabel>
              </PricingHeader>
              <Separator />

              <FreePackageBtn>ACTIVATE FOR FREE</FreePackageBtn>
              <CardContainer>
                {renderPackageItems({ arr: basicPackage })}
                <br />

                <BtnDescription>Use completely free. Cancel anytime.</BtnDescription>
              </CardContainer>
              <div style={cardBgContainerAfter}></div>
            </div>
          </PackageCardContainer>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8, lg: 4 }}>
          <PackageCardContainer>
            <PricingHeader>

              <BasicLabel>PRO </BasicLabel>

              <div>
                <FreeLabel>$9.99</FreeLabel> <SignedText>/ mo</SignedText>
              </div>
            </PricingHeader>
            <Separator />

            <SubscribePackageBtn>SUBSCRIBE NOW</SubscribePackageBtn>
            <CardContainer>
              {renderPackageItems({ arr: proPackage })}

              <BtnDescription>$9.99/month. Cancel anytime.</BtnDescription>

            </CardContainer>
          </PackageCardContainer>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8, lg: 4 }}>
          <PackageCardContainer>
            <div style={cardBgContainerRight}>
              <PricingHeader>

                <BasicLabel>ADVANCED</BasicLabel>

                <div>
                  <FreeLabel>$19.99</FreeLabel> <SignedText>/ mo</SignedText>
                </div>
              </PricingHeader>
              <Separator />

              <SubscribePackageBtn>SUBSCRIBE NOW</SubscribePackageBtn>
              <CardContainer>
                {renderPackageItems({ arr: advancedPackage })}

                <BtnDescription>$19.99/month. Cancel anytime.</BtnDescription>

              </CardContainer>
              <div style={cardBgContainerRightAfter}></div>
            </div>
          </PackageCardContainer>
        </Grid.Col>
      </Grid>
      {showFooter && isPricingPage && <Footer />}
    </PricingContainer>
  );

};

