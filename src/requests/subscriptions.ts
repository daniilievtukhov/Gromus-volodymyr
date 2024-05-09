import axios from "axios";

import { Links } from "../core/links";

export namespace ApiSubscriptionConfig {
  const link = `${Links.api}/Subscription/StripeConfig`;

  export type IResponse = Iconfig;

  export type Iconfig = {
    stripeSubscriptionPremiumUSD: string;
    stripeSubscriptionProUSD: string;
    stripeSubscriptionAdvancedUSD: string;
    tokensMin: string;
    tokensMiddle: string;
    tokensMax: string;
  };

  export const get = async () => {
    return (await axios.get<IResponse>(link)).data;
  };
}
