import { makeAutoObservable } from 'mobx';

import { Deal } from '../networking/models/Deal';

export class DealStore {
  deal?: Deal;
  loading = false;
  tradeInError = '';

  constructor() {
    makeAutoObservable(this);
  }

  setDeal(deal: Deal): void {
    this.deal = deal;
  }

  setTradeInError(value: string): void {
    this.tradeInError = value;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
