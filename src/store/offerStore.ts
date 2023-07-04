import { create } from 'zustand';

import { OfferDetail } from 'src/networking/models/Offer';

export type OfferState = {
  offerDetail?: OfferDetail;
  showOfferDialog: boolean;
  loading: boolean;
  getOfferDetail(offer: OfferDetail): void;
  setLoading(value: boolean): void;
  setShowOfferDialog(value: boolean): void;
};

const useOfferStore = create<OfferState>()((set) => ({
  showOfferDialog: false,
  loading: false,
  getOfferDetail: (offer: OfferDetail) => set({ offerDetail: offer }),
  setLoading: (value: boolean) => set({ loading: value }),
  setShowOfferDialog: (value: boolean) => set({ showOfferDialog: value }),
}));

export default useOfferStore;
