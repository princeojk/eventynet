import { create } from "zustand";

type tradeIntentStore = {
  amount: number;
  isOpen: boolean;
};

export const useTradeIntentStore = create<tradeIntentStore>(() => ({
  amount: 0,
  isOpen: true,
}));
