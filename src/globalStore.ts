import { create } from "zustand";

import { ApiUserInfo } from "./requests/account/info";

type IGlobalState = {
  audios: Record<string, { element: HTMLAudioElement; isActive: boolean }>;
  userInfo: ApiUserInfo.IResponse;
  limit: number;
  musicVideosModal: {
    opened: boolean;
    musicId: string;
  };
  videosModalTutorial: {
    opened: boolean;
    link: string;
    text?: string;
    title: string;
  };
};

export const useGlobalStore = create<IGlobalState>(() => ({
  audios: {},
  userInfo: null as unknown as ApiUserInfo.IResponse,
  limit: 0,
  musicVideosModal: {
    musicId: "",
    opened: false,
  },
  videosModalTutorial: {
    opened: false,
    link: "",
    text: "Unlock AI-Powered Solution! Elevate Your Grow Potential Today.",
    title: "",
  },
}));

export const openMusicVideoModal = (musicId: string) => {
  useGlobalStore.setState({
    musicVideosModal: {
      opened: true,
      musicId,
    },
  });
};

export const closeMusicVideoModal = () => {
  useGlobalStore.setState({
    musicVideosModal: {
      opened: false,
      musicId: "",
    },
  });
};
export const openVideoModalTutorial = (link: string, title: string, text?: string) => {
  useGlobalStore.setState({
    videosModalTutorial: {
      opened: true,
      link,
      text: "Unlock AI-Powered Solution! Elevate Your Grow Potential Today.",
      title,
    },
  });
};

export const closeVideoModalTutorial = () => {
  useGlobalStore.setState({
    videosModalTutorial: {
      opened: false,
      link: "",
      title: "",
      text: "Unlock AI-Powered Solution! Elevate Your Grow Potential Today.",
    },
  });
};
