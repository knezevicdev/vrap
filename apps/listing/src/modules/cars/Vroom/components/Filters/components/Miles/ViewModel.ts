import {
  Filters,
  MaxAndMin,
  resetFilter,
  setMiles,
} from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class MilesViewModel {
  private readonly carsStore: CarsStore;
  private readonly numberFormatter: Intl.NumberFormat;

  readonly range: MaxAndMin = { min: 100, max: 200000 };
  readonly errorLabel: string;
  readonly resetButtonLabel: string = 'Reset';
  readonly step = 100;

  readonly maxInputPlaceholder: string = 'No Maximum';
  readonly maxOnlyInputLabel: string = 'Mileage Maximum';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    this.errorLabel = `Please enter a mileage between ${this.numberFormatter.format(
      this.range.min
    )} and ${this.numberFormatter.format(this.range.max)}`;
  }

  getMaxAndMinInputsValue = (): MaxAndMin | undefined => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return undefined;
    }
    const filtersDataMiles = filtersData[Filters.MILES];
    if (!filtersDataMiles) {
      return undefined;
    }
    return filtersDataMiles;
  };

  private updateFiltersDataMiles(values: MaxAndMin | undefined): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = values
      ? setMiles(values, filtersData)
      : resetFilter(Filters.MILES, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }

  handleInputsDone = (values: MaxAndMin | undefined): void => {
    this.updateFiltersDataMiles(values);
  };

  handleSliderDone = (values: MaxAndMin | undefined): void => {
    this.updateFiltersDataMiles(values);
  };

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataMiles = filtersData[Filters.MILES];
    if (!filtersDataMiles) {
      return true;
    }
    return false;
  };

  handleResetClick(): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilter(Filters.MILES, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default MilesViewModel;
