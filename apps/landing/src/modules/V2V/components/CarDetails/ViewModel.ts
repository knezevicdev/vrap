import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store/inventoryStore';

interface Details {
  ymm: string;
  trim: string;
  miles: string;
  price: string;
}

class CarDetailsViewModel {
  private car: Car;
  readonly button = 'See all vehicle details';

  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }

  details(): Details {
    const { listingPrice, make, miles, model, trim, year } = this.car;
    return {
      ymm: `${year} ${make} ${model}`,
      trim: trim,
      miles: `${miles.toLocaleString('en-US')} miles`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }

  features(): string[] {
    return this.car.optionalFeatures.split(',').slice(0, 6);
  }

  handleClick = (): void => {
    const { makeSlug, modelSlug, year, vin } = this.car;
    window.location.href = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
  };
}

export default CarDetailsViewModel;
