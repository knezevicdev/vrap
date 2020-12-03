import { InventoryStore } from '../../store/inventoryStore';

interface Details {
  ymm: string;
  price: string;
}

class StickyBottomViewModel {
  readonly pageThreshold = 650;
  private store: InventoryStore;

  constructor(store: InventoryStore) {
    this.store = store;
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
