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
