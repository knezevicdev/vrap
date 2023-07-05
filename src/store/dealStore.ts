import { GQLTypes } from '@vroom-web/networking';
import { create } from 'zustand';

export type DealState = {
  deal?: GQLTypes.DealV3;
  loading: boolean;
  tradeInError: string;
  setDeal(deal: GQLTypes.DealV3): void;
  setTradeInError(value: string): void;
  setLoading(value: boolean): void;
};

const useDealStore = create<DealState>()((set) => ({
  loading: false,
  tradeInError: '',
  setDeal: (deal: GQLTypes.DealV3) => set({ deal }),
  setTradeInError: (value: string) => set({ tradeInError: value }),
  setLoading: (value: boolean) => set({ loading: value }),
}));

export default useDealStore;
