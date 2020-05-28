import { CarsStore } from 'src/modules/cars/store';
import {
  resetFilter,
  updateMinAndMax,
} from 'src/modules/cars/utils/navigation';
import { Filters, FiltersData, MaxAndMin } from 'src/modules/cars/utils/types';

export const range = { min: 4000, max: 125000 };
const key = Filters.PRICE;

class PriceViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  onDone = (price: MaxAndMin): void => {
    const filtersData = this.carsStore.filtersData;
    updateMinAndMax(key, price, filtersData as FiltersData);
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    resetFilter(Filters.PRICE, filtersData as FiltersData);
  };

  getStates = (): {
    inputsState: string[] | undefined;
    sliderState: MaxAndMin;
  } => {
    const filtersData = this.carsStore.filtersData;
    const priceFromUrl =
      filtersData && filtersData[key] ? filtersData[key] : undefined;

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
