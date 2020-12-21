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

  topFeatures(): string[] {
    const topFeatures = [
      'Android Auto',
      'Apple Carplay',
      'Heated Seats',
      'Rear-View Camera',
      'Remote Start',
      'Sun/Moonroof',
      'Third Row Seating',
    ];

    const features = this.car.optionalFeatures.split(',');
    const intersection = features.filter((item, index) => {
      if (topFeatures.includes(item)) {
        features.splice(index, 1);
        return true;
      }
    });

    return [...intersection, ...features].slice(0, 6);
  }
}

export default CarDetailsViewModel;
