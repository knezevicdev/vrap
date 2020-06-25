import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  FiltersData,
  Transmission,
  updateTransmission,
} from 'src/modules/cars/utils/url';

class TransmissionsViewModel {
  private readonly carsStore: CarsStore;
  readonly values = [Transmission.ALL, Transmission.AUTO, Transmission.MANUAL];

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getActiveTransmission = (): string => {
    const filtersData = this.carsStore.filtersData;

    const isSelected =
      (filtersData && filtersData[Filters.TRANSMISSION] === 0) ||
      (filtersData && filtersData[Filters.TRANSMISSION] === 1);

    const isAutomatic =
      (filtersData && (filtersData[Filters.TRANSMISSION] as number)) === 0;

    const selected = isAutomatic ? Transmission.AUTO : Transmission.MANUAL;

    return isSelected ? selected : Transmission.ALL;
  };

  handleClick = (transmission: Transmission): void => {
    const filtersData = this.carsStore.filtersData;
    updateTransmission(transmission, filtersData as FiltersData);
  };
}

export default TransmissionsViewModel;
