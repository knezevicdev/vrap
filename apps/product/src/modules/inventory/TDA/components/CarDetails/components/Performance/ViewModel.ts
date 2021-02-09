import {
  Car,
  TransmissionDetailDisplay,
} from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

interface PerformanceSection {
  title: string;
  items: {
    label: string;
    value: string | TransmissionDetailDisplay | undefined;
  }[];
  recallLink: { text: string; href: string };
}
class ViewModel {
  private car: Car;

  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  getInformation = (): PerformanceSection => {
    return {
      title: 'Performance',
      items: [
        {
          label: 'Engine',
          value: this.car.engine,
        },
        {
          label: 'Transmission',
          value: this.car.transmissionDetail?.display,
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
