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
};

export const useGlobalStore = create<IGlobalState>(() => ({
  audios: {},
  userInfo: null as unknown as ApiUserInfo.IResponse,
  limit: 0,
  musicVideosModal: {
    musicId: "",
    opened: false,
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
