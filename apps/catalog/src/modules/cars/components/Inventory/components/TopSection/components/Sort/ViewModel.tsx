import { CarsStore } from 'src/modules/cars/store';
import { FiltersData, SortValue, updateSort } from 'src/modules/cars/utils/url';

class SortViewModel {
  private readonly carsStore: CarsStore;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getActiveState(): SortValue {
    const filtersData = this.carsStore.filtersData;
    const sort = filtersData && filtersData.sort;
    return sort ? sort : SortValue.RECOMMENDED;
  }

  getValues(): SortValue[] {
    return Object.values(SortValue);
  }

  updateURL(value: SortValue): void {
    const filtersData = this.carsStore.filtersData;
    updateSort(value, filtersData as FiltersData);
  }
}

export default SortViewModel;
