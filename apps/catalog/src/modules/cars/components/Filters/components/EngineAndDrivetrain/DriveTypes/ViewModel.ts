import { DriveType } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';
import {
  addDriveType,
  DriveType as FiltersDataDriveType,
  Filters,
  removeDriveType,
} from 'src/modules/cars/utils/url';

class DriveTypesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getDriveTypes = (): DriveType[] => {
    return this.carsStore.driveTypes;
  };

  isChecked = (driveType: DriveType): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataDriveType = filtersData[Filters.DRIVE_TYPE];
    if (!filtersDataDriveType) {
      return false;
    }
    return filtersDataDriveType.includes(driveType.filtersDataValue);
  };

  handleCheckboxChange(
    filtersDataValue: FiltersDataDriveType,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = checked
      ? addDriveType(filtersDataValue, filtersData)
      : removeDriveType(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default DriveTypesViewModel;
