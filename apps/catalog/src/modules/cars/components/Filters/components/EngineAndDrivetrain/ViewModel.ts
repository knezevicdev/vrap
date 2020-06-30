import { CarsStore } from 'src/modules/cars/store';
import { Filters, resetFilters } from 'src/modules/cars/utils/url';

class EngineAndDrivetrainViewModel {
  private readonly carsStore: CarsStore;

  readonly transmissionFilterLabel: string = 'Transmission';
  readonly driveTypeFilterLabel: string = 'Drive Type';
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataDriveType = filtersData[Filters.DRIVE_TYPE];
    const filtersDataTransmission = filtersData[Filters.TRANSMISSION];
    return !filtersDataDriveType && !filtersDataTransmission;
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilters(
      [Filters.DRIVE_TYPE, Filters.TRANSMISSION],
      filtersData
    );
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default EngineAndDrivetrainViewModel;
