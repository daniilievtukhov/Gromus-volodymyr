import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  navbarOpened: boolean;
  chatOpened: boolean;
  showAlert: boolean;
}

export const useLayoutStore = create<State>()(
  persist(
    (set, get) => ({
      navbarOpened: false,
      chatOpened: true,
      showAlert: true,
    }),
    { name: "gromus_layout" },
  ),
);

export const toggleSideMenu = () =>
  useLayoutStore.setState((prev) => {
    const newValue = !prev.navbarOpened;

    return {
      ...prev,
      navbarOpened: newValue,
      chatOpened: newValue ? false : prev.chatOpened,
    };
  });

export const setChatOpened = (v: boolean) => {
  useLayoutStore.setState({ chatOpened: v });
};
