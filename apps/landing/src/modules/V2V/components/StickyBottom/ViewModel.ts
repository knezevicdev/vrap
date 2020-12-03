import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store/inventoryStore';

interface Details {
  ymm: string;
  price: string;
}

class StickyBottomViewModel {
  readonly pageThreshold = 650;
  private car: Car;

  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  details(): Details {
    const { listingPrice, make, model, year } = this.car;
    return {
      ymm: `${year} ${make} ${model}`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }
}

export default StickyBottomViewModel;
