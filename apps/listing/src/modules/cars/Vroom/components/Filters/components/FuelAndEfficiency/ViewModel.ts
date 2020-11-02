import { Filters, resetFilters } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class EngineAndDrivetrainViewModel {
  private readonly carsStore: CarsStore;

  readonly fuelTypeLabel: string = 'Fuel';
  readonly minimumFuelEfficiency: string = 'Minimum Fuel Efficiency';
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataFuelType = filtersData[Filters.FUEL_TYPE];
    return !filtersDataFuelType;
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilters([Filters.FUEL_TYPE], filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  showFuelAndEfficiencyFilters = (): boolean => {
    return this.carsStore.fuelTypeFilterExperiment?.assignedVariant === 1;
  };
}

export default EngineAndDrivetrainViewModel;
