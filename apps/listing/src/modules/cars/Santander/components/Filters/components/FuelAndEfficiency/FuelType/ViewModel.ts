import {
  addFuelType,
  Filters,
  FuelType as FiltersDataFuelType,
  removeFuelType,
} from '@vroom-web/catalog-url-integration';

import { FuelType } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class FuelTypesViewModel {
  private readonly carsStore: CarsStore;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getFuelTypes = (): FuelType[] => {
    return this.carsStore.fuelTypes;
  };

  isChecked = (fuelType: FuelType): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataDriveType = filtersData[Filters.FUEL_TYPE];
    if (!filtersDataDriveType) {
      return false;
    }
    return filtersDataDriveType.includes(fuelType.filtersDataValue);
  };

  handleCheckboxChange(
    filtersDataValue: FiltersDataFuelType,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = checked
      ? addFuelType(filtersDataValue, filtersData)
      : removeFuelType(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default FuelTypesViewModel;
