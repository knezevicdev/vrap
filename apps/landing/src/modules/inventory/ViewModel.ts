import { InventoryStore, Status } from './store/store';

class InventoryViewModel {
  private store: InventoryStore;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  loading(): boolean {
    const result =
      this.store.vehicleStatus === Status.FETCHING ||
      this.store.vehicleStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.vehicleStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.vehicleStatus === Status.ERROR;
  }
}

export default InventoryViewModel;
