import { create } from "zustand";

interface IState {
  states: IStatesData[];
  videoRised: IVideoRised[];
  setStatesData: (states: IStatesData[]) => void;
  setVideosRised: (videoRised: IVideoRised[]) => void;
}

export const useAuthorStatesAnalyticStore = create<IState>((set) => ({
  states: [],
  videoRised: [],
  setStatesData: (states) => set({ states }),
  setVideosRised: (videoRised) => set({ videoRised }),
}));

export type IStatesData = {
  id: string;
  authorId: string;
  subscribers: number;
  subscribedAt: number;
  clips: number;
  likes: number;
  diggCount: number;
  parseDate: string;
  subscribersDailyRise: number;
  subscribersDailyRiseForecastingError: number;
  subscribersDailyRiseForecasting: number;
  subscribersGraphWeight: number;
};
export type IVideoRised = {
  videoId: string;
  playCount: number;
  parseDate: string;
  coverUrl: string;
  likes: number;
  subscribers: number;
};
