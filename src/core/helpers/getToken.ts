import axios from "axios";

export const getToken = () => {
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get("token");

  if (fromUrl) {
    localStorage.setItem("BEARER_TOKEN", fromUrl);
    url.searchParams.delete("token");
    window.history.replaceState({}, "", url.href);
  }

  return localStorage.getItem("BEARER_TOKEN");
};

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("BEARER_TOKEN")}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
