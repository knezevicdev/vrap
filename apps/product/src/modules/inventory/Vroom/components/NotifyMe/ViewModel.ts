import { NotifyMeStore } from './store';

import { InventoryStore } from 'src/modules/inventory/store';

class StartPurchaseViewModel {
  private inventoryStore: InventoryStore;
  private notifyMeStore: NotifyMeStore;
  readonly notifyMeText: string = 'Notify Me';

  constructor(inventoryStore: InventoryStore, notifyMeStore: NotifyMeStore) {
    this.inventoryStore = inventoryStore;
    this.notifyMeStore = notifyMeStore;
  }

  handleClick(): void {
    this.notifyMeStore.toggleModal();
    alert(
      `Vin: ${this.inventoryStore.vehicle._source.vin},modalOpen: ${this.notifyMeStore.modalOpen}`
    );
  }

  toggleModal(): void {
    this.notifyMeStore.toggleModal();
  }
}

export default StartPurchaseViewModel;
