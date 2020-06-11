import { IObservableArray } from 'mobx';

import { CarsStore } from '../../store';
import FiltersStore from './store';

import { Filter } from 'src/modules/cars/utils/types';

class FiltersViewModel {
  private readonly carsStore: CarsStore;
  private readonly filtersStore: FiltersStore;

  constructor(carsStore: CarsStore, filtersStore: FiltersStore) {
    this.carsStore = carsStore;
    this.filtersStore = filtersStore;
  }

  areFiltersOpen = (): boolean => {
    return this.carsStore.areFiltersOpen;
  };

  toggleAreFiltersOpen = (): void => {
    this.carsStore.toggleAreFiltersOpen();
  };

  getFilters = (): IObservableArray<{
    display: Filter;
    open: boolean;
  }> => {
    return this.filtersStore.filters;
  };

  toggleVisibility = (display: Filter): void => {
    this.filtersStore.toggleVisibility(display);
  };
}

export default FiltersViewModel;
