import {
  addCylinder,
  Cylinder as FiltersDataCylinder,
  Filters,
  removeCylinder,
  setOtherCylinders,
} from '@vroom-web/catalog-url-integration';

import { Cylinder } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class CylindersViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';
  readonly otherCylinders = {
    key: 'other',
    display: 'Other (5, electric, etc)',
  };

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getCylinders = (): Cylinder[] => {
    return this.carsStore.cylinders;
  };

  isChecked = (cylinder: Cylinder): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataCylinder = filtersData[Filters.CYLINDERS];
    if (!filtersDataCylinder) {
      return false;
    }
    return filtersDataCylinder.includes(cylinder.filtersDataValue);
  };

  isOtherChecked = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataCylinder = filtersData[Filters.OTHER_CYLINDERS];
    if (!filtersDataCylinder) {
      return false;
    }
    return filtersDataCylinder;
  };

  handleCheckboxChange(
    filtersDataValue: FiltersDataCylinder,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = checked
      ? addCylinder(filtersDataValue, filtersData)
      : removeCylinder(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }

  handleOtherCheckboxChange(checked: boolean): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = setOtherCylinders(checked, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default CylindersViewModel;
