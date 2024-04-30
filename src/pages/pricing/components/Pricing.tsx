import React from "react";

import styled from "styled-components";
import { Grid, Button } from "@mantine/core";
import { Footer } from "./FooterPricing";

import { useLocation } from "react-router-dom";
import PriceCard from "./PriceCard";
import { IPriceCard } from "./PriceCard";

const PricingContainer = styled.div`
  color: white;
  margin: auto;
  text-align: center;
`;

export const SignedText = styled.label`
  color: #d1fd0a;
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

const priceCards: IPriceCard[] = [
  {
    categoryLabel: "BASIC",
    price: "FREE",
    priceDescription: "Use completely free.",
    subscribeLink: "",
    isMonth: false,
    options: [
      { isAvalible: true, signedText: "10 questions", text: "AI Copilot GI", comingSoon: false },
      {
        isAvalible: false,
        signedText: "",
        text: "AI Personalized Best Time & Day to Post",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "3 times",
        text: "AI Personalized Account Analytics",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "3 times",
        text: "TikTok Any Account Insights",
        comingSoon: false,
      },
      { isAvalible: false, signedText: "", text: "AI Personalized Hashtags", comingSoon: false },
      { isAvalible: false, signedText: "", text: "Trending Hashtags", comingSoon: true },
      {
        isAvalible: true,
        signedText: "3 times",
        text: "TikTok Viral Sounds for any Territories",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "3 times/day",
        text: "data access at Pro Platform",
        comingSoon: false,
      },
      { isAvalible: false, signedText: "", text: "AI To-Do Artist Plan", comingSoon: true },
      { isAvalible: false, signedText: "", text: "Spotify AI Analytics", comingSoon: true },
      { isAvalible: false, signedText: "", text: "Your Song AI Analytics", comingSoon: true },
    ],
  },

  {
    categoryLabel: "PRO",
    price: "$9.99",
    priceDescription: "$9.99/month.",
    isMonth: true,
    subscribeLink: "https://buy.stripe.com/7sIbME2gdahebQsfZ4",
    options: [
      { isAvalible: true, signedText: "300 questions", text: "AI Copilot GI", comingSoon: false },
      {
        isAvalible: true,
        signedText: "20 times",
        text: "AI Personalized Best Time & Day to Post",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "20 times",
        text: "AI Personalized Account Analytics",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "20 times",
        text: "of TikTok Any Account Insights",
        comingSoon: false,
      },
      { isAvalible: false, signedText: "", text: "AI Personalized Hashtags", comingSoon: false },
      {
        isAvalible: true,
        signedText: "20 times",
        text: "of Trending Hashtags for any Territories",
        comingSoon: true,
      },
      {
        isAvalible: true,
        signedText: "20 times",
        text: "TikTok Viral Sounds for any Territories",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "20 times/day",
        text: "data access at Pro Platform",
        comingSoon: false,
      },
      { isAvalible: true, signedText: "", text: "AI To-Do Artist Plan", comingSoon: true },
      { isAvalible: true, signedText: "", text: "Spotify AI Analytics", comingSoon: true },
      { isAvalible: true, signedText: "2 times", text: "Your Song AI Analytics", comingSoon: true },
    ],
  },
  {
    categoryLabel: "ADVANCED",
    price: "$19.99",
    priceDescription: "$19.99/month.",
    subscribeLink: "https://buy.stripe.com/6oE03W3kh4WUaMoaEJ",
    isMonth: true,
    options: [
      { isAvalible: true, signedText: "1000 questions", text: "AI Copilot GI", comingSoon: false },
      {
        isAvalible: true,
        signedText: "Unlimited",
        text: "AI Personalized Best Time & Day to Post",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "Unlimited",
        text: "AI Personalized Account Analytics",
        comingSoon: false,
      },
      {
        isAvalible: true,
        signedText: "Unlimited",
        text: "TikTok Any Account Insights",
        comingSoon: false,
      },
      { isAvalible: true, signedText: "", text: "AI Personalized Hashtags", comingSoon: false },
      {
        isAvalible: true,
        signedText: "Unlimited",
        text: "Trending Hashtags for any Territories",
        comingSoon: true,
      },
      {
        isAvalible: true,
        signedText: "Unlimited",
        text: "TikTok Viral Sounds for any Territories",
        comingSoon: false,
      },
      { isAvalible: true, signedText: "Unlimited", text: "Pro Platform", comingSoon: false },
      { isAvalible: true, signedText: "", text: "AI To-Do Artist Plan", comingSoon: true },
      { isAvalible: true, signedText: "", text: "Spotify AI Analytics", comingSoon: true },
      { isAvalible: true, signedText: "5 times", text: "Your Song AI Analytics", comingSoon: true },
    ],
  },
];

export const Pricing = ({ showFooter = true }) => {
  const location = useLocation();
  const isPricingPage = location.pathname === "/pricing";

  const headingStyle = {
    fontSize: "48px",
    margin: "auto",
    ...(isPricingPage && { paddingTop: "60px" }) /*&& isModal*/,
  };

  return (
    <PricingContainer
      style={{
        marginBottom: "60px",
        alignItems: "center",
        backgroundColor: "#0D0D0E",
        height: "100vh",
      }}
    >
      <h2 style={headingStyle}>Select your plan to enjoy more from GROMUS AI</h2>

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
        {priceCards.map((priceCard) => (
          <PriceCard priceCard={priceCard} />
        ))}
      </Grid>
      {showFooter && isPricingPage && <Footer />}
    </PricingContainer>
  );
};
