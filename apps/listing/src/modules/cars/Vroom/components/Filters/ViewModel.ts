import FiltersStore, { Filter } from './store';

import { CarsStore } from 'src/modules/cars/store';

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

  getFilters = (): Filter[] => {
    return this.filtersStore.filters;
  };

  toggleVisibility = (filter: Filter): void => {
    this.filtersStore.toggleVisibility(filter);
  };

  showFeaturesFilter = (): boolean => {
    return this.carsStore.featuresFilterExperiment?.assignedVariant === 1;
  };
}

export default FiltersViewModel;
