import { Filters, resetFilters } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class EngineAndDrivetrainViewModel {
  private readonly carsStore: CarsStore;

  readonly transmissionFilterLabel: string = 'Transmission';
  readonly driveTypeFilterLabel: string = 'Drive Type';
  readonly cylindersFilterLabel: string = 'Engine Cylinders';
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
    const filtersDataCylinders = filtersData[Filters.CYLINDERS];
    const filtersDataOtherCylinders = filtersData[Filters.OTHER_CYLINDERS];
    return (
      !filtersDataDriveType &&
      !filtersDataTransmission &&
      !filtersDataCylinders &&
      !filtersDataOtherCylinders
    );
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilters(
      [
        Filters.DRIVE_TYPE,
        Filters.TRANSMISSION,
        Filters.CYLINDERS,
        Filters.OTHER_CYLINDERS,
      ],
      filtersData
    );
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default EngineAndDrivetrainViewModel;
