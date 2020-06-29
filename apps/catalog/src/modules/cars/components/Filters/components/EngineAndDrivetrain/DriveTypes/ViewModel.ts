import { DriveType } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';
import {
  DriveType as FiltersDataDriveType,
  Filters,
  FiltersData,
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

  private addFiltersDataDriveType(
    filtersDataValue: FiltersDataDriveType,
    filtersDataDriveType?: FiltersDataDriveType[]
  ): FiltersDataDriveType[] {
    if (!filtersDataDriveType) {
      return [filtersDataValue];
    }
    if (filtersDataDriveType.includes(filtersDataValue)) {
      return filtersDataDriveType;
    }
    return [...filtersDataDriveType, filtersDataValue];
  }

  private removeFiltersDataDriveType(
    filtersDataValue: FiltersDataDriveType,
    filtersDataDriveType?: FiltersDataDriveType[]
  ): FiltersDataDriveType[] | undefined {
    if (!filtersDataDriveType) {
      return undefined;
    }
    if (!filtersDataDriveType.includes(filtersDataValue)) {
      return filtersDataDriveType;
    }
    if (filtersDataDriveType.length === 1) {
      return undefined;
    }
    return filtersDataDriveType.filter((dt) => dt !== filtersDataValue);
  }

  private getUpdatedFiltersDataDriveType(
    filtersDataValue: FiltersDataDriveType,
    checked: boolean,
    filtersDataDriveType?: FiltersDataDriveType[]
  ): FiltersDataDriveType[] | undefined {
    if (checked) {
      return this.addFiltersDataDriveType(
        filtersDataValue,
        filtersDataDriveType
      );
    }
    return this.removeFiltersDataDriveType(
      filtersDataValue,
      filtersDataDriveType
    );
  }

  handleCheckboxChange(
    filtersDataValue: FiltersDataDriveType,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const filtersDataDriveType = filtersData
      ? filtersData[Filters.DRIVE_TYPE]
      : undefined;
    const updatedFiltersDataDriveType = this.getUpdatedFiltersDataDriveType(
      filtersDataValue,
      checked,
      filtersDataDriveType
    );
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.DRIVE_TYPE]: updatedFiltersDataDriveType,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default DriveTypesViewModel;
