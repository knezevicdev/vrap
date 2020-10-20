import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';

import { InventoryStore } from 'src/modules/inventory/store';

interface BannerInfo {
  label: string;
  color: string;
}
class StatusBannerViewModel {
  private store: InventoryStore;
  private salesPending = {
    label: 'Sale Pending',
    color: '#ffd400',
  };
  private availableSoon = {
    label: 'Available Soon',
    color: '#bdbdbd',
  };

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  getBanner(): BannerInfo | null {
    const {
      isAvailableToSell,
      leadFlagPhotoUrl,
      soldStatus,
    } = this.store.vehicle._source;
    const vehicleServiceAvailability = this.store.isAvailable;
    if (!isAvailableToSell || isEmpty(leadFlagPhotoUrl)) {
      return this.availableSoon;
    }
    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      return this.salesPending;
    }
    return null;
  }
}

export default StatusBannerViewModel;
