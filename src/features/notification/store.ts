import { uniqueId } from "lodash-es";
import { create } from "zustand";

import { RequiredFields } from "../../types/common";
import { INotification } from "./type";

interface IState {
  stack: RequiredFields<INotification, "id">[];
  add: (notification: INotification) => void;
  remove: (id: string) => void;
  clear: VoidFunction;
}

export const useNotificationStore = create<IState>((set, get) => ({
  stack: [],
  add: (notification) => {
    const id = notification.id || uniqueId();
    const autoclose = notification.autoclose ?? true;

    if (autoclose) {
      const ms = typeof autoclose === "number" ? autoclose * 1000 : 4000;

      setTimeout(() => get().remove(id), ms);
    }

    set({ stack: [...get().stack, { ...notification, id }] });
  },
  remove: (id) => set({ stack: get().stack.filter((el) => el.id !== id) }),
  clear: () => set({ stack: [] }),
}));
