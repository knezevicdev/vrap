import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  MaxAndMin,
  resetFilter,
  setYear,
} from 'src/modules/cars/utils/url';

class YearViewModel {
  private readonly carsStore: CarsStore;
  readonly errorLabel: string;
  readonly resetButtonLabel: string = 'Reset';
  readonly range: MaxAndMin = { min: 2000, max: 2020 };
  readonly step = 1;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
    this.errorLabel = `'Please enter a range of years within ${this.range.min}-${this.range.max}`;
  }

  getMaxAndMinInputsValue = (): MaxAndMin | undefined => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return undefined;
    }
    const filtersDataYear = filtersData[Filters.YEAR];
    return filtersDataYear;
  };

  handleMaxAndMinInputsChange = (value?: MaxAndMin): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = value
      ? setYear(value, filtersData)
      : resetFilter(Filters.YEAR, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataPrice = filtersData[Filters.YEAR];
    if (!filtersDataPrice) {
      return true;
    }
    return false;
  };

  handleResetClick(): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilter(Filters.YEAR, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default YearViewModel;
