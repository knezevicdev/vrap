import getConfig from 'next/config';

import { InventoryStore, Status } from './store/inventoryStore';
import AnalyticsHandler from './integrations/AnalyticsHandler';

const { publicRuntimeConfig } = getConfig();

class InventoryViewModel {
  private store: InventoryStore;
  readonly button = 'Shop vehicles now';
  readonly errorText = 'Something went wrong.';
  readonly icon = `${publicRuntimeConfig.BASE_PATH}/icons/no-result.svg`;
  private analyticsHandler: AnalyticsHandler;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  loading(): boolean {
    const result =
      this.store.vehicleStatus === Status.FETCHING ||
      this.store.vehicleStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.vehicleStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.vehicleStatus === Status.ERROR;
  }

  handleClick(): void {
    window.location.href = '/cars';
  }

  setSticky(value: boolean): void {
    this.store.setSticky(value);
  }

  trackLandingViewed(): void {
    const car = this.store.vehicle._source;
    this.analyticsHandler.trackVinLandingPageViewed(car);
  }
}

export default InventoryViewModel;
