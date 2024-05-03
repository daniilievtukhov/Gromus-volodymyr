import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IState {
  greeted: boolean;
  greet: VoidFunction;
}

export const useGreetingStore = create<IState>()(
  persist(
    (set) => ({
      greeted: false,
      greet: () => set({ greeted: true }),
    }),
    { name: "gromus_greeting" },
  ),
);

interface IStateHowItWork {
  clicked: boolean;
  click: VoidFunction;
}

export const useHowItWorkStore = create<IStateHowItWork>()(
  persist(
    (set) => ({
      clicked: false,
      click: () => set({ clicked: true }),
    }),
    { name: "gromus_how_it_work" },
  ),
);
