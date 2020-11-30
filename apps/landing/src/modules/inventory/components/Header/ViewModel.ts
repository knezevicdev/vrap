import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store/store';

interface Details {
  ymm: string;
  price: string;
}

class HeaderViewModel {
  readonly logoHref = '/';
  readonly pageThreshold = 550;
  readonly button = 'See all vehicle details';
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

  handleClick = (): void => {
    const { makeSlug, modelSlug, year, vin } = this.car;
    window.location.href = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
  };
}

export default HeaderViewModel;
