import React from "react";
import { Pricing } from "./components/Pricing";
import { NavBarPricing } from "./components/NavBarPricing";
import { Stack } from "@mantine/core";

export const PricingPage = () => {
  return (
    <Stack>
      <NavBarPricing />
      <Pricing />
    </Stack>
  );
};
