import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  MaxAndMin,
  resetFilter,
  setMiles,
} from 'src/modules/cars/utils/url';

class MilesViewModel {
  private readonly carsStore: CarsStore;
  private readonly numberFormatter: Intl.NumberFormat;

  readonly range: MaxAndMin = { min: 0, max: 200000 };
  readonly errorLabel: string;
  readonly resetButtonLabel: string = 'Reset';
  readonly step = 1000;

  readonly maxInputPlaceholder: string = 'No Maximum';
  readonly maxOnlyInputLabel: string = 'Mileage Maximum';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    this.errorLabel = `Please enter a mileage less than or equal to ${this.numberFormatter.format(
      this.range.max
    )}`;
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
