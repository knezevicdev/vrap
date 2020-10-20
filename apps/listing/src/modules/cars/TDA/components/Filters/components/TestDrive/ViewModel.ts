import {
  Filters,
  resetFilter,
  setTestDrive,
  TestDrive as FiltersDataTestDrive,
} from '@vroom-web/catalog-url-integration';

import { TestDrive } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class TestDriveViewModel {
  private readonly carsStore: CarsStore;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getTestDrives = (): TestDrive[] => {
    return this.carsStore.testDrives;
  };

  isChecked = (testDrive: TestDrive): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataTestDrive = filtersData[Filters.TEST_DRIVE];
    if (!filtersDataTestDrive) {
      return false;
    }
    return filtersDataTestDrive.includes(testDrive.filtersDataValue);
  };

  handleCheckboxChange(
    filtersDataValue: FiltersDataTestDrive,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = checked
      ? setTestDrive(filtersDataValue, filtersData)
      : resetFilter(Filters.TEST_DRIVE, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default TestDriveViewModel;
