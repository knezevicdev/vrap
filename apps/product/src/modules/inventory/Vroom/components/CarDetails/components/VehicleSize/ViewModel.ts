import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

class ViewModel {
  private car: Car;
  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  getInformation = () => {
    return {
      title: 'Vehicle Size',
      items: [
        {
          label: 'Height',
          value: `${this.car.height}`,
        },
        {
          label: 'Length',
          value: `${this.car.length}"`,
        },
        {
          label: 'Width',
          value: `${this.car.width}`,
        },
        {
          label: 'Ground Clearance',
          value: `${this.car.groundClearance}"`,
        },
        {
          label: 'Wheelbase',
          value: `${this.car.wheelBase}"`,
        },
        {
          label: 'Front Track Width',
          value: `${this.car.frontTrackWidth}"`,
        },
        {
          label: 'Rear Track Width',
          value: `${this.car.rearTrackWidth}"`,
        },
      ],
    };
  };
}

export default ViewModel;
