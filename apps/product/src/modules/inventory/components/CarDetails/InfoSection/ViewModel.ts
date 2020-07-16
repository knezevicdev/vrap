import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

interface Section {
  title: string;
  items: { label: string; value: string }[];
}

class InfoSectionViewModel {
  private car: Car;
  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }
  sections: Section[] = [
    {
      title: 'Basics',
      items: [
        {
          label: 'Body Type',
          value: this.car.bodyType,
        },
        {
          label: 'Interior',
          value: this.car.intColor,
        },
        {
          label: 'Exterior',
          value: this.car.extColor,
        },
        {
          label: 'VIN',
          value: this.car.vin,
        },
      ],
    },
    {
      title: 'Vehicle Size',
      items: [
        {
          label: 'Height',
          value: '135.6"',
        },
        {
          label: 'Length',
          value: '135.6"',
        },
        {
          label: 'Ground Clearance',
          value: '135.6"',
        },
        {
          label: 'Wheelbase',
          value: '135.6"',
        },
        {
          label: 'Front Track Width',
          value: '135.6"',
        },
        {
          label: 'Rear Track Width',
          value: '135.6"',
        },
      ],
    },
    {
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
    },
  ];
}

export default InfoSectionViewModel;
