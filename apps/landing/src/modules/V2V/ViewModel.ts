import getConfig from 'next/config';

import AnalyticsHandler from '../integrations/AnalyticsHandler';
import { InventoryStore, Status } from './store/inventoryStore';

const { publicRuntimeConfig } = getConfig();

class InventoryViewModel {
  private store: InventoryStore;
  readonly valuePropOrderKey: string | null;
  readonly button = 'Shop vehicles now';
  readonly errorText = 'We couldn’t find this vehicle';
  readonly icon = `${publicRuntimeConfig.BASE_PATH}/icons/no-result.svg`;
  private analyticsHandler: AnalyticsHandler;

  constructor(
    inventoryStore: InventoryStore,
    analyticsHandler: AnalyticsHandler,
    valuePropOrderKey: string | null
  ) {
    this.store = inventoryStore;
    this.analyticsHandler = analyticsHandler;
    this.valuePropOrderKey = valuePropOrderKey;
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
    this.analyticsHandler.trackVinLandingPageViewed();
  }
}

export default InventoryViewModel;