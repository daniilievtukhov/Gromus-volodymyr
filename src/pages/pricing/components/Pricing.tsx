import React, { useEffect } from "react";

import styled from "styled-components";
import { Grid, Button } from "@mantine/core";
import { Footer } from "./FooterPricing";

import { useLocation } from "react-router-dom";
import PriceCard from "./PriceCard";
import { IPriceCard } from "./PriceCard";
import { ApiSubscriptionConfig } from "../../../requests/subscriptions";
import { useQuery } from "@tanstack/react-query";

const PricingContainer = styled.div`
  align-items: center;
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

export const Pricing = ({ showFooter = true, showText = true }) => {
  const location = useLocation();
  const isPricingPage = location.pathname === "/pricing";

  const headingStyle = {
    fontSize: "48px",
    margin: "auto",
    ...(isPricingPage && { paddingTop: "60px" }) /*&& isModal*/,
  };

  const { data } = useQuery({
    queryKey: ["stripeSubscriptions"],
    queryFn: async () => {
      const res = await ApiSubscriptionConfig.get();

      const pro = res.stripeSubscriptionProUSD;
      const advance = res.stripeSubscriptionAdvancedUSD;
      const premium = res.stripeSubscriptionPremiumUSD;

      return { pro, advance, premium };
    },
  });
  let priceCards: IPriceCard[] = [];
  if (data) {
    priceCards = [
      {
        categoryLabel: "BASIC",
        price: "FREE",
        priceDescription: "Use completely free.",
        subscribeLink: "",
        isMonth: false,
        options: [
          {
            isAvalible: true,
            signedText: "10 requests",
            text: "to your personal AI Assistant",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "3 times",
            text: "of viral TikTok sounds",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "3 min",
            text: "video to text AI scripts (TikTok / Instagram)",
            comingSoon: false,
          },
          {
            isAvalible: false,
            signedText: "",
            text: "AI personalized best time & day to post",
            comingSoon: false,
          },
          { isAvalible: false, signedText: "", text: "Trending Hashtags", comingSoon: false },
          {
            isAvalible: true,
            signedText: "3 times",
            text: "of Your account analytics",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "3 times",
            text: "of any platform TikTok account analytics",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "3 times",
            text: "of Gromus Pro using",
            comingSoon: false,
          },
        ],
      },

      {
        categoryLabel: "PRO",
        price: "$9.99",
        priceDescription: "$9.99/month.",
        isMonth: true,
        subscribeLink: data.pro,
        options: [
          {
            isAvalible: true,
            signedText: "300 questions",
            text: "to your personal AI Assistant",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 times",
            text: "of viral TikTok sounds",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "100 min",
            text: "video to text AI scripts (TikTok / Instagram)",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 times",
            text: "of AI personalized best time & day to post",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 times",
            text: "of Trending Hashtags",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 times",
            text: "of Your account analytics",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 times",
            text: "of any TikTok account analytics",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 times",
            text: "of Gromus Pro using",
            comingSoon: false,
          },
        ],
      },
      {
        categoryLabel: "ADVANCED",
        price: "$19.99",
        priceDescription: "$19.99/month.",
        subscribeLink: data.advance,
        isMonth: true,
        options: [
          {
            isAvalible: true,
            signedText: "1000 questions",
            text: "to your personal AI Assistant",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "of viral TikTok sounds",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "300 min",
            text: "video to text AI scripts (TikTok / Instagram)",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "AI personalized best time & day to post",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "Trending Hashtags",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "Your account analytics",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "any TikTok account analytics",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "of Gromus Pro using",
            comingSoon: false,
          },
        ],
      },
    ];
  }
  return (
    <PricingContainer
      style={{
        alignItems: "center",
        backgroundColor: "#0D0D0E",
      }}
    >
      {showText && <h2 style={headingStyle}>Select your plan to enjoy more from GROMUS AI</h2>}

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
