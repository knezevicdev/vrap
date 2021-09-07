import { makeAutoObservable } from 'mobx';

export interface OfferDetail {
  make: string;
  model: string;
  price: number;
  trim: string;
  year: number;
  miles: number;
}

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
