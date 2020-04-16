import { Store } from '../../../../store';
import { Filters } from '../../../../util';

class EngineAndDrivetrainViewModel {
  readonly resetButtonLabel: string = 'Reset';
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  isDisabled = (): boolean => {
    /*
      TODO
      Add to filters state and observe that way.
     */
    const transmissionFromURL =
      this.store.filtersDataFromUrl &&
      this.store.filtersDataFromUrl[Filters.TRANSMISSION];

    const driveTypesFromUrl =
      this.store.filtersDataFromUrl &&
      this.store.filtersDataFromUrl[Filters.DRIVE_TYPE];

    return (
      !transmissionFromURL && transmissionFromURL !== 0 && !driveTypesFromUrl
    );
  };

  reset = (): void => {
    this.store.resetFilter(Filters.TRANSMISSION);
    this.store.resetFilter(Filters.DRIVE_TYPE);
  };
}

export default EngineAndDrivetrainViewModel;
