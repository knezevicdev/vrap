import { Filters } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class InventoryViewModel {
  private readonly store: CarsStore;

  constructor(store: CarsStore) {
    this.store = store;
  }

  hideVehicleCount(): boolean {
    const filters = this.store.filtersData;

    if (!filters) return true;

    const appliedFilters = Object.keys(filters);
    if (appliedFilters.length === 1 && appliedFilters.includes(Filters.PAGE))
      return true;

    return false;
  }

  hidePagination = (): boolean => {
    return !this.store.hasInventory;
  };
}

export default InventoryViewModel;
