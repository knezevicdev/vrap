import { CarsStore } from 'src/modules/cars/store';
import {
  resetFilter,
  updateMinAndMax,
} from 'src/modules/cars/utils/navigation';
import { Filters, FiltersData } from 'src/modules/cars/utils/types';

export const range = { min: 2000, max: 2020 };
const key = Filters.YEAR;

class YearViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  onDone = (years: number[]): void => {
    const filtersData = this.carsStore.filtersData;
    updateMinAndMax(
      key,
      { min: years[0], max: years[1] },
      filtersData as FiltersData
    );
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    resetFilter(Filters.YEAR, filtersData as FiltersData);
  };

  getStates = (): {
    inputsState: string[] | undefined;
    sliderState: number[];
  } => {
    const filtersData = this.carsStore.filtersData;
    const yearsFromFilters = filtersData && filtersData[key];

    const inputsState = yearsFromFilters
      ? [yearsFromFilters.min.toString(), yearsFromFilters.max.toString()]
      : undefined;

    const sliderState = yearsFromFilters
      ? [yearsFromFilters.min, yearsFromFilters.max]
      : [range.min, range.max];

    return { inputsState, sliderState };
  };
}

export default YearViewModel;
