import { CarsStore } from 'src/modules/cars/store';
import { Filters, FiltersData, MaxAndMin } from 'src/modules/cars/utils/url';

class YearViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';
  readonly range: MaxAndMin = { min: 2000, max: 2020 };

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getYear = (): MaxAndMin | undefined => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return undefined;
    }
    const filtersDataPrice = filtersData[Filters.YEAR];
    return filtersDataPrice;
  };

  private udpateFiltersDataYear = (value: MaxAndMin | undefined): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.YEAR]: value,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  handleInputsChange = (value: MaxAndMin | undefined): void => {
    this.udpateFiltersDataYear(value);
  };

  handleSliderChange = (value: MaxAndMin | undefined): void => {
    this.udpateFiltersDataYear(value);
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
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.YEAR]: undefined,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default YearViewModel;
