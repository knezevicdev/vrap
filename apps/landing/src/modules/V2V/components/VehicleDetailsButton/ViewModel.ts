import { Car } from '@vroom-web/inv-search-networking';

import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import { InventoryStore } from '../../store/inventoryStore';

class VehicleDetailsButtonViewModel {
  readonly button = 'See all vehicle details';
  private car: Car;
  private analyticsHandler: AnalyticsHandler;

  constructor(store: InventoryStore, analyticsHandler: AnalyticsHandler) {
    this.car = store.vehicle._source;
    this.analyticsHandler = analyticsHandler;
  }

  handleClick = (): void => {
    const { makeSlug, modelSlug, year, vin } = this.car;
    this.analyticsHandler.trackVinLandingPageViewed();
    window.location.href = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
  };
}

export default VehicleDetailsButtonViewModel;
