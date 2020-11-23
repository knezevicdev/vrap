import { InventoryStore } from './store/store';
import { Car } from '@vroom-web/inv-search-networking';

class InventoryViewModel {
  private car: Car;

  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }

  getCar = () => {
    return JSON.stringify(this.car, null, 2);
  };
}

export default InventoryViewModel;
