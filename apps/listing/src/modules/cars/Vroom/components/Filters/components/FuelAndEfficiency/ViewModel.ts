import { Filters, resetFilters } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class FuelAndEfficiencyViewModel {
  private readonly carsStore: CarsStore;

  readonly fuelTypeLabel: string = 'Fuel';
  readonly minimumFuelEfficiency: string =
    'Minimum Efficiency - Combined City/Hwy';
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
    const filtersDataFuelEfficiency = filtersData[Filters.FUEL_EFFICIENCY];
    return !filtersDataFuelType && !filtersDataFuelEfficiency;
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilters(
      [Filters.FUEL_TYPE, Filters.FUEL_EFFICIENCY],
      filtersData
    );
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default FuelAndEfficiencyViewModel;
