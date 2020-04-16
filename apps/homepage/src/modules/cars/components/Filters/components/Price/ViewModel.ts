import { Store } from '../../../../store';
import { Filters, MaxAndMin } from '../../../../util';

export const range = { min: 4000, max: 125000 };
const key = Filters.PRICE;

class PriceViewModel {
  readonly resetButtonLabel: string = 'Reset';
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  onDone = (price: MaxAndMin): void => {
    this.store.updateMinAndMax(key, price);
  };

  reset = (): void => {
    this.store.resetFilter(Filters.PRICE);
  };

  getStates = (): {
    inputsState: string[] | undefined;
    sliderState: MaxAndMin;
  } => {
    const urlFilters = this.store.filtersDataFromUrl;

    const priceFromUrl =
      urlFilters && urlFilters[key] ? urlFilters[key] : undefined;

    const inputsState = priceFromUrl && [
      priceFromUrl.min.toString(),
      priceFromUrl.max.toString(),
    ];

    const sliderState = {
      min: priceFromUrl ? priceFromUrl.min : range.min,
      max: priceFromUrl ? priceFromUrl.max : range.max,
    };

    return { inputsState, sliderState };
  };
}

export default PriceViewModel;
