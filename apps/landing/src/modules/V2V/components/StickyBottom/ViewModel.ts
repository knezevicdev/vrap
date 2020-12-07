import { InventoryStore, Status } from '../../store/inventoryStore';

interface Details {
  ymm: string;
  price: string;
}

class StickyBottomViewModel {
  private store: InventoryStore;

  constructor(store: InventoryStore) {
    this.store = store;
  }

  hasCar(): boolean {
    return this.store.vehicleStatus === Status.SUCCESS;
  }

  details(): Details {
    const { listingPrice, make, model, year } = this.store.vehicle._source;
    return {
      ymm: `${year} ${make} ${model}`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }

  getSticky = (): boolean => this.store.showSticky;
}

export default StickyBottomViewModel;
