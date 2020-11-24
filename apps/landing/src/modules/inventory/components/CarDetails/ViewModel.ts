import { InventoryStore } from '../../store/store';
import { Car } from '@vroom-web/inv-search-networking';

interface Details {
  ymm: string;
  trim: string;
  miles: string;
  price: string;
}

class CarDetailsViewModel {
  private car: Car;

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

  handleClick = (): void => {
    const { make, model, year, vin } = this.car;
    window.location.href = `/inventory/${make}-${model}-${year}-${vin}`;
  };

  handleFavoritesClick = (): void => {};
}

export default CarDetailsViewModel;
