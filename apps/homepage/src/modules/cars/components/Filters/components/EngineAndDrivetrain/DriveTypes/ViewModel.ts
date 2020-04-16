import { Store } from '../../../../../store';
import { DriveType, Filters } from '../../../../../util';

class DriveTypesViewModel {
  readonly resetButtonLabel: string = 'Reset';
  readonly values = [
    DriveType.FOUR_BY_FOUR,
    DriveType.AWD,
    DriveType.FWD,
    DriveType.RWD,
  ];
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  getActiveDriveTypes = (): string[] => {
    /*
      TODO
      Add to filters state and observe that way.
    */
    return this.store.filtersDataFromUrl &&
      this.store.filtersDataFromUrl[Filters.DRIVE_TYPE]
      ? (this.store.filtersDataFromUrl[Filters.DRIVE_TYPE] as string[])
      : [];
  };

  handleClick = (driveType: DriveType, isSelected: boolean) => (): void => {
    isSelected
      ? this.store.removeFromList(Filters.DRIVE_TYPE, driveType)
      : this.store.addToList(Filters.DRIVE_TYPE, driveType);
  };
}

export default DriveTypesViewModel;
