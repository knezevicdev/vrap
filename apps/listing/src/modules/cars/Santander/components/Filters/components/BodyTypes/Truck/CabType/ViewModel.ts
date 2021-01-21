import {
  addCabType,
  CabType as FiltersDataCabType,
  Filters,
  removeCabType,
} from '@vroom-web/catalog-url-integration';

import { CabType } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class CabTypeViewModel {
  private readonly carsStore: CarsStore;
  readonly crewCabLabel: string = '4 Door Crew Cab';
  readonly regularCabLabel: string = '2 Door Standard Cab';
  readonly extendedCabLabel: string = '4 Door Extended Cab';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getCabTypes = (): CabType[] => {
    return this.carsStore.cabTypes;
  };

  isChecked = (cabType: CabType): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataCabType = filtersData[Filters.CAB_TYPE];
    if (!filtersDataCabType) {
      return false;
    }
    return filtersDataCabType.includes(cabType.filtersDataValue);
  };

  handleCheckboxChange(
    filtersDataValue: FiltersDataCabType,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = checked
      ? addCabType(filtersDataValue, filtersData)
      : removeCabType(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default CabTypeViewModel;
