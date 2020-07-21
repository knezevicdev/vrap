import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';
import { Section } from '../../ViewModel';

class ViewModel {
  private car: Car;
  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  getInformation= (): Section => {
    return {
      title: 'Basics',
      items: [
        {
          label: 'Body Type',
          value: this.car.bodyType,
        },
        {
          label: 'Interior',
          value: this.car.intColor,
        },``
        {
          label: 'Exterior',
          value: this.car.extColor,
        },
        {
          label: 'VIN',
          value: this.car.vin,
        },
      ],
    };
  };
}

export default ViewModel;
