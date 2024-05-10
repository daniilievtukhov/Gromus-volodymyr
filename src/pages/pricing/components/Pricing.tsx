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
        categoryLabel: "PRO",
        price: "$9.99",
        discount: "",
        isDiscount: false,
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
            signedText: "50 min",
            text: "video to text AI scripts (TikTok / Instagram)",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "20 results for:",
            text: "",
            comingSoon: false,
          },
        ],
        priceList: [
          {
            listItem: "Viral TiikTok sounds",
          },
          {
            listItem: "AI personalized best time & day to post",
          },
          {
            listItem: "Trending Hashtags",
          },
          {
            listItem: "Your account analitics",
          },
          {
            listItem: "Any TikTok account analitics",
          },
          {
            listItem: "GROMUS Pro platform",
          },
        ]
      },
      {
        categoryLabel: "ADVANCED",
        price: "$19.99",
        discount: "$99.99",
        isDiscount: true,
        priceDescription: "$19.99/month.",
        subscribeLink: data.advance,
        isMonth: true,
        options: [
          {
            isAvalible: true,
            signedText: "300 questions",
            text: "to your personal AI Assistant",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "150 min",
            text: "video to text AI scripts (TikTok / Instagram)",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "100 results for:",
            text: "",
            comingSoon: false,
          },
        ],
        priceList: [
          {
            listItem: "Viral TiikTok sounds",
          },
          {
            listItem: "AI personalized best time & day to post",
          },
          {
            listItem: "Trending Hashtags",
          },
          {
            listItem: "Your account analitics",
          },
          {
            listItem: "Any TikTok account analitics",
          },
          {
            listItem: "GROMUS Pro platform",
          },
        ]
      },
      {
        categoryLabel: "CUSTOM",
        price: "$999.99",
        discount: "",
        isDiscount: false,
        priceDescription: "$999.99/month.",
        subscribeLink: data.advance,
        isMonth: true,
        options: [
          {
            isAvalible: true,
            signedText: "Unlimited",
            text: "to your personal AI Assistant",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "1000 min",
            text: "video to text AI scripts (TikTok / Instagram)",
            comingSoon: false,
          },
          {
            isAvalible: true,
            signedText: "Unlimited results for:",
            text: "",
            comingSoon: false,
          },
        ],
        priceList: [
          {
            listItem: "Viral TiikTok sounds",
          },
          {
            listItem: "AI personalized best time & day to post",
          },
          {
            listItem: "Trending Hashtags",
          },
          {
            listItem: "Your account analitics",
          },
          {
            listItem: "Any TikTok account analitics",
          },
          {
            listItem: "GROMUS Pro platform",
          },
        ]
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
