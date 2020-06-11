import { CarsStore } from 'src/modules/cars/store';
import {
  resetFilter,
  updateMinAndMax,
} from 'src/modules/cars/utils/navigation';
import { Filters, FiltersData, MaxAndMin } from 'src/modules/cars/utils/types';

export const range = { min: 0, max: 200000 };
const key = Filters.MILES;

class MilesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  onDone = (miles: MaxAndMin | undefined): void => {
    const filtersData = this.carsStore.filtersData;
    miles
      ? updateMinAndMax(key, miles, filtersData as FiltersData)
      : resetFilter(Filters.MILES, filtersData as FiltersData);
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    resetFilter(Filters.MILES, filtersData as FiltersData);
  };

  getMilesFromUrl = (): { miles: string | undefined } => {
    const filtersData = this.carsStore.filtersData;
    const milesFromUrl =
      filtersData && filtersData[key] ? filtersData[key] : undefined;
    const miles = milesFromUrl ? milesFromUrl.max.toString() : undefined;

    return { miles };
  };
}

export default MilesViewModel;
