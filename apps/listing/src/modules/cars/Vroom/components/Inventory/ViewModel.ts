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
    if (appliedFilters.includes(Filters.MAKE_AND_MODELS)) return false;

    return true;
  }

  hidePagination = (): boolean => {
    return !this.store.hasInventory;
  };
}

export default InventoryViewModel;
