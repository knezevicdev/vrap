import { action, observable } from 'mobx';

export class PriceDisclaimerStore {
  @observable tooltipOpen = false;

  @action
  openTooltip = (): void => {
    this.tooltipOpen = true;
  };
  @action
  closeTooltip = (): void => {
    this.tooltipOpen = false;
  };
}
