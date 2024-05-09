import { create } from "zustand";

interface IPricingModal {
  modalState: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const pricingModal = create<IPricingModal>((set) => ({
  modalState: false,
  openModal: () => set((state: any) => ({ ...state, modalState: true })),
  closeModal: () => set((state: any) => ({ ...state, modalState: false })),
}));
