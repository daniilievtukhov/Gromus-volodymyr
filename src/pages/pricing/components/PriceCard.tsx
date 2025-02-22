import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Anchor, Stack, Container } from "@mantine/core";
import Check from "../../../assets/icons/check.svg";
import Close from "../../../assets/icons/close.svg";
import { useState } from "react";
import axios from "axios";
import { getToken } from "../../../core/helpers/getToken";
import { useUserSettingsStore } from "../../../features/userSettings/store/user";
import { useGlobalStore } from "../../../globalStore";

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

const DiscountLabel = styled.label`
  font-weight: 500;
  font-size: 35px;
  color: #fff;
`;

const FreePackageBtn: React.FC<{ children: string; category: string; activeCategory: string }> = ({
  children,
  category,
  activeCategory,
}) => {
  const [hover, setHover] = useState(false);
  const token = getToken();
  const unsubcribeButtonStyles = {
    background: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.04)",
    color: category.toUpperCase() !== "BASIC" ? "#d1fd0a" : undefined,
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "12%",
    width: "90%",
    height: "60px",
    borderRadius: "8px",
    marginBottom: "10px",
    ...(hover && {
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.1)",
    }),
  };

  const onSubmit = async () => {
    const res = await axios.get("https://react.gromus.ai/api/Subscription/StripeUnsubscribe", {
      headers: { Authorization: `Bearer ${token}` },
    });

  };

  return (
    <Button
      display={category === "BASIC" ? "none" : "block"}
      role="link"
      style={unsubcribeButtonStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={activeCategory.toUpperCase() === "BASIC"}
      onClick={onSubmit}
    >
      {children}
    </Button>
  );
};


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

const DiscountText = styled.label`
  color: #fff;
  font-size: 20px;
`;

const DiscountContainer = styled.div`
  color: #fff !important;
  font-size: 30px;
`;

export const SubscribePackageBtn: React.FC<{ subscribeLink: string }> = ({ subscribeLink }) => {
  const [hover, setHover] = useState(false);

  const buttonStyle = {
    background: "#d1fd0a",
    borderColor: "#d1fd0a",
    color: "black",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "12%",
    width: "90%",
    height: "60px",
    borderRadius: "8px",
    marginBottom: "10px",
    ...(hover && {
      color: "black",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      background: "rgba(209, 253, 10, 0.7)",
      borderColor: "rgba(209, 253, 10, 0.7)",
    }),
  };

  return (
    <Anchor href={subscribeLink}>
      <Button
        style={buttonStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        SUBSCRIBE NOW
      </Button>
    </Anchor>
  );
};

const BtnDescription = styled.label`
  color: #cbcbcb;
  font-weight: 400;
  font-size: 14px;
  padding-top: 5px;
`;

const comingSoonStyle: React.CSSProperties = {
  color: "#D1FD0A",
  background: "rgba(209, 253, 10, 0.05)",
  padding: "8px",
  borderRadius: "16px",
  fontSize: "13px",
  textWrap: "nowrap",
};

const PackageCardContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 16px;
  padding: 20px;
  z-index: 1;
`;

const PriceCardOptions: React.FC<{
  options: IPriceCardOption[];
  priceList: IPriceCardList[];
}> = ({ options, priceList }) => {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
      {options.map(({ isAvalible, signedText, text, comingSoon }, index: number) => (
        <li
          key={index}
          style={{ marginBottom: "20px", display: "flex", alignItems: "center", fontSize: "13px" }}
        >
          {isAvalible ? (
            <img height={24} src={Check} style={{ marginRight: "10px" }} />
          ) : (
            <img height={24} src={Close} style={{ marginRight: "10px" }} />
          )}
          <div style={{ marginRight: "10px", textAlign: "left" }}>
            <label style={{ color: " #D1FD0A", paddingRight: "5px" }}>{signedText}</label>
            {text}
          </div>
          {comingSoon && <CustomBudget text="coming soon" />}
        </li>
      ))}
      {priceList.map((item, index) => (
        <ul key={index} style={{ textAlign: "left", listStyle: "inside" }}>
          <li style={{ marginBottom: "20px" }}>{item.listItem}</li>
        </ul>
      ))}
    </ul>
  );
};

const CustomBudget = ({ text }: { text: string }) => {
  return (
    <label style={comingSoonStyle} className="mx-1">
      {" "}
      {text}{" "}
    </label>
  );
};

interface IPriceCardOption {
  isAvalible: boolean;
  signedText: string;
  text: string;
  comingSoon: boolean;
}

interface IPriceCardList {
  listItem: string;
}

export interface IPriceCard {
  categoryLabel: "PRO" | "ADVANCED" | "CUSTOM";
  price: string;
  discount: string;
  isDiscount: boolean;
  subscribeLink: string;
  isMonth: boolean;
  priceDescription: string;
  options: IPriceCardOption[];
  priceList: IPriceCardList[];
}

const PriceCard: React.FC<{ priceCard: IPriceCard }> = ({ priceCard }) => {
  const { categoryLabel, price, discount, isDiscount, options, priceDescription, isMonth, subscribeLink, priceList } = priceCard;
  const user = useGlobalStore();

  const stripeSubscription = user.userInfo?.stripeSubscription;

  const account = useUserSettingsStore((s) => s.userRole);

  return (
    <Grid.Col style={{ backgroundColor: "#0d0d0e" }} span={{ base: 12, md: 8, lg: 4 }}>
      <PackageCardContainer>
        <PricingHeader>
          <BasicLabel>{categoryLabel}</BasicLabel>
          <Stack>
            <Container>
              <FreeLabel>{price}</FreeLabel>
              {isMonth && <SignedText>/ mo</SignedText>}
            </Container>
            <DiscountContainer>
              <DiscountLabel style={{ textDecorationLine: "line-through red", textDecorationColor: "red" }}>{discount}</DiscountLabel>
              {isDiscount && <DiscountText> / mo </DiscountText>}
            </DiscountContainer>
          </Stack>

        </PricingHeader>
        <Separator />
        {isMonth && (account !== categoryLabel.toUpperCase() || !stripeSubscription) ? (
          <SubscribePackageBtn subscribeLink={subscribeLink} />
        ) : (
          <FreePackageBtn category={categoryLabel} activeCategory={account}>
            {isMonth ? "CANCEL" : "ACTIVATE FOR FREE"}
          </FreePackageBtn>
        )}

        <CardContainer>
          <PriceCardOptions options={options} priceList={priceList} />

          <BtnDescription>{priceDescription} Cancel anytime.</BtnDescription>
        </CardContainer>
      </PackageCardContainer>
    </Grid.Col>
  );
};

export default PriceCard;
