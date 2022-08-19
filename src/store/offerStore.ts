import { makeAutoObservable } from 'mobx';

import { OfferDetail } from 'src/networking/models/Offer';

export class OfferStore {
  offerDetail?: OfferDetail;
  showOfferDialog = false;
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

  setShowOfferDialog(value: boolean): void {
    this.showOfferDialog = value;
  }
}
