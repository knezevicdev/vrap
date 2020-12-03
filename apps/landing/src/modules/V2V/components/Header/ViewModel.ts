import { InventoryStore } from '../../store/inventoryStore';

interface Details {
  ymm: string;
  price: string;
}

class HeaderViewModel {
  readonly logoHref = '/';
  readonly button = 'See all vehicle details';
  private store: InventoryStore;

  constructor(store: InventoryStore) {
    this.store = store;
  }

  hasCar(): boolean {
    return this.store.vehicle._source !== undefined;
  }

  details(): Details {
    const { listingPrice, make, model, year } = this.store.vehicle._source;
    return {
      ymm: `${year} ${make} ${model}`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }

  handleClick = (): void => {
    const { makeSlug, modelSlug, year, vin } = this.store.vehicle._source;
    window.location.href = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
  };

  getSticky = (): boolean => this.store.showSticky;
}

export default HeaderViewModel;
