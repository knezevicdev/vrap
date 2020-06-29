import { CarsStore } from 'src/modules/cars/store';
import { Filters, FiltersData, MaxAndMin } from 'src/modules/cars/utils/url';

class PriceViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';
  readonly range: MaxAndMin = { min: 4000, max: 125000 };

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getPrice = (): MaxAndMin | undefined => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return undefined;
    }
    const filtersDataPrice = filtersData[Filters.PRICE];
    return filtersDataPrice;
  };

  private updateFiltersDataPrice = (value: MaxAndMin | undefined): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.PRICE]: value,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  handleInputsChange = (value: MaxAndMin | undefined): void => {
    this.updateFiltersDataPrice(value);
  };

  handleSliderChange = (value: MaxAndMin | undefined): void => {
    this.updateFiltersDataPrice(value);
  };

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataPrice = filtersData[Filters.PRICE];
    if (!filtersDataPrice) {
      return true;
    }
    return false;
  };

  handleResetClick(): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.PRICE]: undefined,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default PriceViewModel;
