import { CarsStore } from 'src/modules/cars/store';

class InventoryViewModel {
  private readonly store: CarsStore;

  constructor(store: CarsStore) {
    this.store = store;
  }

  hidePagination = (): boolean => {
    return !this.store.hasInventory;
  };
}

export default InventoryViewModel;
