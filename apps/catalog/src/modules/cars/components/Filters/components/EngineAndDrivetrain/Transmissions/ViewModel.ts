import { Transmission } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  FiltersData,
  Transmission as FiltersDataTransmission,
} from 'src/modules/cars/utils/url';

class TransmissionsViewModel {
  private readonly carsStore: CarsStore;

  readonly allOption = {
    display: 'All',
    value: 'all',
  };

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getTransmissions = (): Transmission[] => {
    return this.carsStore.transmissions;
  };

  getActiveTransmission = (): string => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return this.allOption.value;
    }
    const filtersDataTransmission = filtersData[Filters.TRANSMISSION];
    if (!filtersDataTransmission) {
      return this.allOption.value;
    }
    return filtersDataTransmission;
  };

  handleRadioGroupChange = (
    filtersDataValue: FiltersDataTransmission
  ): void => {
    const updatedFiltersDataTransmission =
      filtersDataValue === this.allOption.value ? undefined : filtersDataValue;
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.TRANSMISSION]: updatedFiltersDataTransmission,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default TransmissionsViewModel;
