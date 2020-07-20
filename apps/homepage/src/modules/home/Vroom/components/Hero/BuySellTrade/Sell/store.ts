import { action, observable } from 'mobx';

export class SellStore {
  @observable tab = 0;

  @action
  setTab = (tab: number): void => {
    this.tab = tab;
  };
}
