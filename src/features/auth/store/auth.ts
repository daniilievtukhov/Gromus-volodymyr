import { create } from "zustand";

interface IState {
  userName: string;
  setUserName: (v: string) => void;
}

export const useAuthStore = create<IState>((set) => ({
  userName: "",
  setUserName: (userName) => set({ userName }),
}));
