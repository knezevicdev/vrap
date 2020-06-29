import { CarsStore } from 'src/modules/cars/store';
import { Filters, FiltersData, MaxAndMin } from 'src/modules/cars/utils/url';

class MilesViewModel {
  private readonly carsStore: CarsStore;
  readonly range: MaxAndMin = { min: 0, max: 200000 };
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  private getMiles = (): MaxAndMin | undefined => {
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

  getState = (): string | undefined => {
    const miles = this.getMiles();
    if (!miles) {
      return undefined;
    }
    return miles.max.toString();
  };

  private updateFiltersDataMiles(values: MaxAndMin | undefined): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.MILES]: values,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  }

  handleInputsDone = (values: MaxAndMin | undefined): void => {
    this.updateFiltersDataMiles(values);
  };

  handleSliderDone = (values: MaxAndMin | undefined): void => {
    this.updateFiltersDataMiles(values);
  };

  isResetButtonDisabled = (): boolean => {
    const miles = this.getMiles();
    if (!miles) {
      return true;
    }
    return false;
  };

  handleResetClick(): void {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return;
    }
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.MILES]: undefined,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default MilesViewModel;
