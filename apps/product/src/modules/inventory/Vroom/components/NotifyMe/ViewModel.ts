import { InventoryStore } from 'src/modules/inventory/store';

class StartPurchaseViewModel {
  private store: InventoryStore;
  readonly notifyMeText: string = 'Notify Me';

  constructor(store: InventoryStore) {
    this.store = store;
  }

  handleClick(): void {
    alert(this.store.vehicle._source.vin);
  }
}

export default StartPurchaseViewModel;
