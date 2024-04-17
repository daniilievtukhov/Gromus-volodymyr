export namespace Environment {
  export const isDev = process.env.NODE_ENV === "development";

  export const llmDomain = process.env.REACT_APP_LLM || "";
  export const beDomain = process.env.REACT_APP_BACKEND || "";
  export const feDomain = process.env.REACT_APP_FRONTEND || "";
}
