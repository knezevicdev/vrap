import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';

import { InventoryStore } from '../../store';

interface BannerInfo {
  label: string;
  color: string;
}
class StatusBannerViewModel {
  private store: InventoryStore;
  private salesPending = {
    label: 'Sales Pending',
    color: '#ffd400',
  };
  private avaiableSoon = {
    label: 'Available Soon',
    color: '#bdbdbd',
  };

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  getBanner(): BannerInfo | null {
    const {
      hasStockPhotos,
      leadFlagPhotoUrl,
      soldStatus,
    } = this.store.vehicle._source;
    const vehicleServiceAvailability = this.store.isAvailable;
    if (hasStockPhotos || isEmpty(leadFlagPhotoUrl)) {
      return this.avaiableSoon;
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
