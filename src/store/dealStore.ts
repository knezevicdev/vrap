import { GQLTypes } from '@vroom-web/networking';
import { makeAutoObservable } from 'mobx';

export class DealStore {
  deal?: GQLTypes.Deal;
  loading = false;
  tradeInError = '';

  constructor() {
    makeAutoObservable(this);
  }

  setDeal(deal: GQLTypes.Deal): void {
    this.deal = deal;
  }

  setTradeInError(value: string): void {
    this.tradeInError = value;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
