import { action, makeObservable, observable } from 'mobx';

export class BuySellTradeStore {
  @observable tab = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  setTab = (tab: number): void => {
    this.tab = tab;
  };
}
