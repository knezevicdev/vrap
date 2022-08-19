import { makeAutoObservable } from 'mobx';

import { Deal } from '../networking/models/Deal';

export class DealStore {
  deal?: Deal;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setDeal(deal: Deal): void {
    this.deal = deal;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
