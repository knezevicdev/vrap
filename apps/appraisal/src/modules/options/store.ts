import { action, observable } from 'mobx';

export class OptionsStore {
  @observable payOptionSelected = 'Direct Deposit';
  @observable payOptionArr = ['Direct Deposit', 'Check by Mail'];
  @observable showDD = true;

  @action
  setPayOptionSelected = (value: string): void => {
    this.payOptionSelected = value;
    this.showDD = value === this.payOptionArr[0];
  };
}
