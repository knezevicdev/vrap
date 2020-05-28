import { CarsStore } from 'src/modules/cars/store';
import { addToList, removeFromList } from 'src/modules/cars/utils/navigation';
import { DriveType, Filters, FiltersData } from 'src/modules/cars/utils/types';

class DriveTypesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';
  readonly values = [
    DriveType.FOUR_BY_FOUR,
    DriveType.AWD,
    DriveType.FWD,
    DriveType.RWD,
  ];

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getActiveDriveTypes = (): string[] => {
    const filtersData = this.carsStore.filtersData;
    return filtersData && filtersData[Filters.DRIVE_TYPE]
      ? (filtersData[Filters.DRIVE_TYPE] as string[])
      : [];
  };

  handleClick = (driveType: DriveType, isSelected: boolean) => (): void => {
    const filtersData = this.carsStore.filtersData;
    isSelected
      ? removeFromList(
          Filters.DRIVE_TYPE,
          driveType,
          filtersData as FiltersData
        )
      : addToList(Filters.DRIVE_TYPE, driveType, filtersData);
  };
}

export default DriveTypesViewModel;
