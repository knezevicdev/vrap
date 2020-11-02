import { action, observable } from 'mobx';

export class OptionsStore {
  @observable payOptionSelected = 'Direct Deposit';

  @action
  setPayOptionSelected = (value: string): void => {
    this.payOptionSelected = value;
  };
}
