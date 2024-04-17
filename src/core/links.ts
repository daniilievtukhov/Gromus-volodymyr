import qs from "qs";

import { Environment } from "./environment";

export namespace Links {
  export const llm = !Environment.isDev ? Environment.llmDomain : "/llm";
  export const api = `${(!Environment.isDev && Environment.beDomain) || ""}/api`;

  export const rootAuth = `${Environment.beDomain}/api/Account`;
  export const googleAuth = `${rootAuth}/GoogleAuth${qs.stringify(
    {
      provider: "Google",
      returnUrl: Environment.feDomain,
    },
    { addQueryPrefix: true },
  )}`;

  export const proDomain = "https://pro.gromus.ai";
  export const pricing = `${proDomain}/home/pricing`;
}
