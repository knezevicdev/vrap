import { CarsStore } from 'src/modules/cars/store';
import { Filters, resetEngineAndDrivetrain } from 'src/modules/cars/utils/url';

class EngineAndDrivetrainViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  isDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    const transmissionFromURL =
      filtersData && filtersData[Filters.TRANSMISSION];

    const driveTypesFromUrl = filtersData && filtersData[Filters.DRIVE_TYPE];

    return (
      !transmissionFromURL && transmissionFromURL !== 0 && !driveTypesFromUrl
    );
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFilters = {
      ...filtersData,
      [Filters.DRIVE_TYPE]: undefined,
      [Filters.TRANSMISSION]: undefined,
    };
    resetEngineAndDrivetrain(updatedFilters);
  };
}

export default EngineAndDrivetrainViewModel;
