import { PriceDisclaimerStore } from './store';

class PriceDisclaimerViewModel {
  private store: PriceDisclaimerStore;
  constructor(store: PriceDisclaimerStore) {
    this.store = store;
  }
  readonly title: string = 'Pricing';

  isTooltipOpen = (): boolean | undefined => {
    return this.store.tooltipOpen;
  };

  handleTooltipOpen = (): void => {
    this.store.openTooltip();
  };

  handleTooltipClose = (): void => {
    this.store.closeTooltip();
  };
}

export default PriceDisclaimerViewModel;
