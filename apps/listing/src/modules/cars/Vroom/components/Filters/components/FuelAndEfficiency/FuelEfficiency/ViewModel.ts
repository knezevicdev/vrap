import {
  Filters,
  FuelEfficiency,
  MaxAndMin,
  resetFilter,
  setFuelEfficiency,
} from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

export type UpdateFiltersDataFuelEfficiencyResponseType = (
  value: FuelEfficiency | undefined
) => void;

class FuelEfficiencyViewModel {
  private readonly carsStore: CarsStore;
  readonly errorLabel = '';
  readonly range: MaxAndMin = { min: 0, max: 60 };
  readonly step = 10;
  filterHeader = 'None';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getFuelEfficiencyData = (): { label: string; color: string } => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return { label: 'None', color: 'grey.500' };
    }
    const filtersDataFuelEfficiency = filtersData[Filters.FUEL_EFFICIENCY];
    if (!filtersDataFuelEfficiency) {
      return { label: 'None', color: 'grey.500' };
    }
    return {
      label: `${filtersDataFuelEfficiency.min} MPG +`,
      color: 'text.primary',
    };
  };

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

  updateFiltersDataFuelEfficiency = (
    values: FuelEfficiency | undefined
  ): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = values?.min
      ? setFuelEfficiency({ min: values?.min }, filtersData)
      : resetFilter(Filters.FUEL_EFFICIENCY, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  handleSliderDone = (
    updateFiltersDataFuelEfficiency: UpdateFiltersDataFuelEfficiencyResponseType,
    values: FuelEfficiency | undefined
  ): void => {
    updateFiltersDataFuelEfficiency(values);
  };
}

export default FuelEfficiencyViewModel;
