import { create } from "zustand";

import { ApiSounds } from "../../requests/stats/sounds";

interface IState {
  tableData: ISoundData[];
  setTableData: (data: ISoundData[]) => void;
}

export const useRisingSoundsStore = create<IState>((set) => ({
  tableData: [],
  setTableData: (tableData) => set({ tableData }),
}));

export type ISoundData = {
  id: string;
  cover: string;
  title: string;
  tikTokLink: null | string;
  shazamLink: null | string;
  playUrl: string;
  musicId: string;
  author: string;
  authorId: number | null;
  musicOriginal: boolean;
  growth: number;
  lastWeekViewStats: number[] | null;
  reposts: number;
  dailyRise: number;
  topAudienceLocation: string;
  notAvailable: boolean;
};
