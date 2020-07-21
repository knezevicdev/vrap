import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

class ViewModel {
  private car: Car;

  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  getInformation = () => {
    return {
      title: 'Performance',
      items: [
        {
          label: 'Engine',
          value: this.car.engine,
        },
        {
          label: 'Transmission',
          value: this.car.transmission,
        },
        {
          label: 'Drive Type',
          value: this.car.driveType,
        },
        {
          label: 'Fuel Type',
          value: this.car.fuelType,
        },
        ...(this.car.cityMpg > 0 && this.car.highwayMpg > 0
          ? [
              {
                label: 'MPG',
                value: `${this.car.cityMpg} City / ${this.car.highwayMpg} Hwy`,
              },
            ]
          : []),
      ],
      recallLink: {
        text: 'Check for Safety Recalls',
        href: `https://www.nhtsa.gov/recalls?vin=${this.car.vin}`,
      },
    };
  };
}

export default ViewModel;
