import { Transmission } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  resetFilter,
  setTransmission,
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
    const filtersData = this.carsStore.filtersData;
    const isAllOption = filtersDataValue === this.allOption.value;
    const updatedFiltersData = isAllOption
      ? resetFilter(Filters.TRANSMISSION, filtersData)
      : setTransmission(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default TransmissionsViewModel;
