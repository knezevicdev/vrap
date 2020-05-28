import { action, computed, observable } from 'mobx';
import { createContext } from 'react';

import {
  fetchInventoryData,
  fetchPopularCars,
  getDataForMakeAndModels,
} from 'src/modules/cars/utils/data';
import { getFiltersDataFromUrl } from 'src/modules/cars/utils/filter';
import { FiltersData, MakeAndModels } from 'src/modules/cars/utils/types';
import { Inventory } from 'src/networking/models/Inventory.v3';
import { Status } from 'src/networking/types';

export interface InitialCarsStoreState {
  filters?: string;
  makeAndModelsData?: MakeAndModels;
  makeAndModelsStatus: Status;
  inventoryData?: Inventory;
  inventoryStatus: Status;
  popularCarsData?: Inventory;
  popularCarsStatus: Status;
}

export async function getInitialCarsStoreState(
  filters?: string
): Promise<InitialCarsStoreState> {
  const initialState: InitialCarsStoreState = {
    filters,
    makeAndModelsStatus: Status.FETCHING,
    inventoryStatus: Status.FETCHING,
    popularCarsStatus: Status.FETCHING,
  };

  const makeAndModelsData = await getDataForMakeAndModels();
  initialState.makeAndModelsData = makeAndModelsData;
  if (makeAndModelsData) {
    initialState.makeAndModelsStatus = Status.SUCCESS;
  } else {
    initialState.makeAndModelsStatus = Status.ERROR;
  }

  const inventoryData = await fetchInventoryData(filters, makeAndModelsData);
  initialState.inventoryData = inventoryData;
  if (inventoryData) {
    initialState.inventoryStatus = Status.SUCCESS;
  } else {
    initialState.inventoryStatus = Status.ERROR;
  }

  const hasNoInventory = inventoryData?.data.hits.total === 0;

  const popularCarsData = hasNoInventory ? await fetchPopularCars() : undefined;
  initialState.popularCarsData = popularCarsData;
  if (popularCarsData) {
    initialState.popularCarsStatus = Status.SUCCESS;
  } else {
    initialState.popularCarsStatus = Status.ERROR;
  }

  return initialState;
}

export class CarsStore {
  @observable filters?: string;
  @computed get filtersData(): FiltersData | undefined {
    return getFiltersDataFromUrl(this.filters);
  }

  @observable makeAndModelsData?: MakeAndModels;
  @observable makeAndModelsStatus: Status = Status.INITIAL;

  @observable inventoryData?: Inventory;
  @observable inventoryStatus: Status = Status.INITIAL;
  @computed get hasInventory(): boolean {
    if (this.inventoryData) {
      return this.inventoryData.data.hits.total !== 0;
    }
    return false;
  }

  @observable popularCarsData?: Inventory;
  @observable popularCarsStatus: Status = Status.INITIAL;
  @computed get hasPopularCars(): boolean {
    if (this.popularCarsData) {
      return this.popularCarsData.data.hits.total !== 0;
    }
    return false;
  }

  @observable areFiltersOpen = false;

  constructor(initialState?: InitialCarsStoreState) {
    if (initialState) {
      this.filters = initialState.filters;
      this.makeAndModelsData = initialState.makeAndModelsData;
      this.makeAndModelsStatus = initialState.makeAndModelsStatus;
      this.inventoryData = initialState.inventoryData;
      this.inventoryStatus = initialState.inventoryStatus;
      this.popularCarsData = initialState.popularCarsData;
      this.popularCarsStatus = initialState.popularCarsStatus;
    }
  }

  @action
  resetToInitialState = (initialState: InitialCarsStoreState): void => {
    this.filters = initialState.filters;
    this.makeAndModelsData = initialState.makeAndModelsData;
    this.makeAndModelsStatus = initialState.makeAndModelsStatus;
    this.inventoryData = initialState.inventoryData;
    this.inventoryStatus = initialState.inventoryStatus;
    this.popularCarsData = initialState.popularCarsData;
    this.popularCarsStatus = initialState.popularCarsStatus;
  };

  @action
  setFilters = (filters?: string): void => {
    this.filters = filters;
  };

  @action
  setInventoryStatusLoading = (): void => {
    this.inventoryStatus = Status.FETCHING;
  };

  @action
  setAreFiltersOpen = (areFiltersOpen: boolean): void => {
    this.areFiltersOpen = areFiltersOpen;
  };

  @action
  toggleAreFiltersOpen = (): void => {
    this.areFiltersOpen = !this.areFiltersOpen;
  };
}

export const CarsStoreContext = createContext<CarsStore>(new CarsStore());
