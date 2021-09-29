import { makeAutoObservable } from 'mobx';

import { OfferDetail } from 'src/types/offer';

export class OfferStore {
  offerDetail?: OfferDetail;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  getOfferDetail(offer: OfferDetail): void {
    this.offerDetail = offer;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
