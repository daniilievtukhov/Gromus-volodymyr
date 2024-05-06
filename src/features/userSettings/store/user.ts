import { create } from "zustand";

interface IState {
  userRole: string;
  setUserRole: (v: string) => void;
}

export const useUserSettingsStore = create<IState>((set) => ({
  userRole: "DEMO",
  setUserRole: (userRole) => set({ userRole }),
}));
