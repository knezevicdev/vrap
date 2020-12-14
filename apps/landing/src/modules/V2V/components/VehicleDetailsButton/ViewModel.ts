import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store/inventoryStore';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';

class VehicleDetailsButtonViewModel {
  readonly button = 'See all vehicle details';
  private car: Car;
  private analyticsHandler: AnalyticsHandler;

  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleClick = (): void => {
    const { makeSlug, modelSlug, year, vin } = this.car;
    this.analyticsHandler.trackVinLandingPageViewed(this.car);
    window.location.href = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
  };
}

export default VehicleDetailsButtonViewModel;
