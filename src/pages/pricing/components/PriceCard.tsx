import React from "react";
import styled from "styled-components";
import { Grid, Button } from "@mantine/core";

import Check from "../../../assets/icons/check.svg";
import Close from "../../../assets/icons/close.svg";
import { Anchor } from "react-bootstrap";
import { useState } from "react";
import { useGlobalStore } from "../../../globalStore";
import { unsubscribe } from "diagnostics_channel";

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

const FreePackageBtn = () => {
  const [hover, setHover] = useState(false);

  const unsubcribeButtonStyles = {
    background: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.04)",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "12%",
    width: "90%",
    height: "60px",
    borderRadius: "8px",
    marginBottom: "10px",
    ...(hover && {
        background: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.1)"
    })
  };

  return (
    <Anchor href={"https://react.gromus.ai/api/Subscription/StripeUnsubscribe"}>
      <Button
        role="link" 
        style={unsubcribeButtonStyles} 
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
      >
        {/* UNSUBSCRIBE */}
        ACTIVATE FOR FREE
      </Button>
    </Anchor>

  )  
}

// styled(Button)`
//     background: rgba(255, 255, 255, 0.04);
//     border-color: rgba(255, 255, 255, 0.04);
//     font-size: 15px;
//     font-weight: 700;
//     letter-spacing: 12%;
//     width: 90%;
//     height: 60px;
//     border-radius: 8px;
//     margin-bottom: 10px;

//       &:hover {
//         background: rgba(255, 255, 255, 0.1);
//         border-color: rgba(255, 255, 255, 0.1);
// `;

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


export const SubscribePackageBtn: React.FC<{subscribeLink: string, clientId: string}> = ({subscribeLink, clientId}) => {
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
      borderColor: "rgba(209, 253, 10, 0.7)"
      
    })
  };
  
  return (
    
    <Anchor href={`${subscribeLink}?client_reference_id=sub-${clientId}`}>
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

// https://buy.stripe.com/test_9AQaGz3QIeUN2KkaEE
//   styled(Button)`
    // background: #d1fd0a;
    // border-color: #d1fd0a;
    // color: black;
    // font-size: 15px;
    // font-weight: 700;
    // letter-spacing: 12%;
    // width: 90%;
    // height: 60px;
    // border-radius: 8px;
    // margin-bottom: 10px;

    // &:hover {
    //   background: #d1fd0b;
    //   border-color: #d1fd0a;
    //   color: black;
    //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    // }
// `;

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

const PriceCardOptions:React.FC<{
    options: IPriceCardOption[]
  }> = (
    {
      options
    }
  ) => {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
        {options.map(
          (
            {isAvalible, signedText, text, comingSoon},
            index: number,
          ) => (
            <li key={index} style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              {isAvalible
                ? <img height={24} src={Check} style={{ marginRight: "10px" }} />
                : <img height={24} src={Close} style={{ marginRight: "10px" }} />
              } 
              <div style={{ marginRight: "10px" }}>
                <label style={{ color: " #D1FD0A", paddingRight: "5px" }}>{signedText}</label>
                {text}
              </div>
              {comingSoon && <CustomBudget text="coming soon" />}
            </li>
          ),
        )}
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
  comingSoon: boolean 
} 

export interface IPriceCard {
  categoryLabel: "BASIC" | "PRO" | "ADVANCED",
  price: string,
  subscribeLink: string,
  isMonth: boolean,
  priceDescription: string,
  options: IPriceCardOption[]
  
}

const PriceCard: React.FC<{priceCard: IPriceCard}> = ({ priceCard }) => {
  const { categoryLabel, price, options, priceDescription, isMonth, subscribeLink } = priceCard;
  const user = useGlobalStore()
  console.log(user);
  return (
    <Grid.Col span={{ base: 12, md: 8, lg: 4 }}>
      <PackageCardContainer>
        <PricingHeader>
          <BasicLabel>{categoryLabel}</BasicLabel>
          <div>
          <FreeLabel>{price}</FreeLabel> 
          {isMonth && <SignedText>/ mo</SignedText>}
          </div>
        </PricingHeader>
        <Separator />
        {isMonth 
          ? <SubscribePackageBtn subscribeLink={subscribeLink} clientId={user.userInfo.id}/> 
          : <FreePackageBtn />
        }

          <CardContainer>
            <PriceCardOptions options={options} />
            
            <BtnDescription>{priceDescription}{" "}Cancel anytime.</BtnDescription>
          </CardContainer>
      </PackageCardContainer>
    </Grid.Col>
  );
}




export default PriceCard;