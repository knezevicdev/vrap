import { Car } from '@vroom-web/inv-search-networking';

import { Section } from '../../ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';

interface VehicleSizeItems {
  label: string;
  value: string;
}

class ViewModel {
  private car: Car;
  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  getInformation = (): Section => {
    const vehicleSizes = [
      { label: 'Height', value: this.car.height },
      { label: 'Length', value: this.car.length },
      { label: 'Width', value: this.car.width },
      { label: 'Ground Clearance', value: this.car.groundClearance },
      { label: 'Wheelbase', value: this.car.wheelBase },
      { label: 'Front Track Width', value: this.car.frontTrackWidth },
      { label: 'Rear Track Width', value: this.car.rearTrackWidth },
    ];

    const updatedSizes = vehicleSizes.map((element) => {
      const returnObj = {} as VehicleSizeItems;
      returnObj['label'] = element.label;
      returnObj['value'] =
        element.value === 0 ? 'Unavailable' : `${element.value}"`;
      return returnObj;
    });
    return {
      title: 'Vehicle Size',
      items: [...updatedSizes],
    };
  };
}

export default ViewModel;
