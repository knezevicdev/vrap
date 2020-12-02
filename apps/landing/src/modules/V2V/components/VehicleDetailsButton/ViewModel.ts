import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store/inventoryStore';

class VehicleDetailsButtonViewModel {
  readonly button = 'See all vehicle details';
  private car: Car;

  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  handleClick = (): void => {
    const { makeSlug, modelSlug, year, vin } = this.car;
    window.location.href = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
  };
}

export default VehicleDetailsButtonViewModel;
