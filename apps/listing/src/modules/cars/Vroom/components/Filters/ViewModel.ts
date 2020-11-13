import FiltersStore, { Filter, FilterDisplay } from './store';

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
    // There are 2 filters that are going to be run as
    // an A/B test both under Fuel And Efficiency
    // This makes sure that if a user isn't in either
    // The whole section will not appear
    return this.filtersStore.filters.filter(
      (filter) =>
        this.showFuelAndEfficiencyFilters() ||
        filter.display !== FilterDisplay.FUEL_AND_EFFICIENCY
    );
  };

  toggleVisibility = (filter: Filter): void => {
    this.filtersStore.toggleVisibility(filter);
  };

  showFuelAndEfficiencyFilters = (): boolean => {
    return (
      this.carsStore.fuelTypeFilterExperiment?.assignedVariant === 1 ||
      this.carsStore.fuelEfficiencyFilterExperiment?.assignedVariant === 1
    );
  };
  showFeaturesFilter = (): boolean => {
    return this.carsStore.featuresFilterExperiment?.assignedVariant === 1;
  };
}

export default FiltersViewModel;
