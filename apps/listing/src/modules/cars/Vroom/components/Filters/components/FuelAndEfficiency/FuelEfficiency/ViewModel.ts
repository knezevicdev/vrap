import {
  Filters,
  FuelEfficiency,
  MaxAndMin,
  resetFilter,
  setFuelEfficiency,
} from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class FuelEfficiencyViewModel {
  private readonly carsStore: CarsStore;
  readonly errorLabel = 'test';

  readonly range: MaxAndMin = { min: 0, max: 60 };
  readonly step = 10;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getMaxAndMinInputsValue = (): MaxAndMin | undefined => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return undefined;
    }
    const filtersDataFuelEfficiency = filtersData[Filters.FUEL_EFFICIENCY];
    if (!filtersDataFuelEfficiency) {
      return undefined;
    }
    return { ...filtersDataFuelEfficiency, max: 60 };
  };

  private updateFiltersDataFuelEfficiency(
    values: FuelEfficiency | undefined
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = values?.min
      ? setFuelEfficiency({ min: values?.min }, filtersData)
      : resetFilter(Filters.MILES, filtersData);
    console.log(updatedFiltersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }

  handleSliderDone = (values: FuelEfficiency | undefined): void => {
    this.updateFiltersDataFuelEfficiency(values);
  };
}

export default FuelEfficiencyViewModel;
