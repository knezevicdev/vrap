import { Experiment, ExperimentSDK } from '@vroom-web/experiment-sdk';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';
import { action, observable } from 'mobx';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

interface BannerInfo {
  id: string;
  label: string;
  color: string;
  font: string;
  tooltipTitle?: string;
  tooltipText1?: string;
  tooltipText1Bold?: string;
  tooltipText2?: string;
  tooltipText3?: string;
}

export const GREAT_FEATURES_BADGE = 'auto-combined-drivers-demand-only';

class StatusBannerViewModel {
  private store: InventoryStore;
  private salesPending = {
    id: 'sale-pending',
    label: 'Sale Pending',
    color: '#ffd400',
    font: 'inherit',
  };
  private availableSoon = {
    id: 'available-soon',
    label: 'Available Soon',
    color: '#bdbdbd',
    font: 'inherit',
  };
  private tenDayDelivery = {
    id: 'ten-day-delivery',
    label: '10-Day Delivery',
    color: '#0f3a7b',
    font: '#ffffff',
    tooltipTitle: '10-Day Delivery',
    tooltipText1: 'Based on the location of this vehicle, we expect it can be ',
    tooltipText1Bold: 'delivered to you in 10 days or less.',
    tooltipText2:
      'This delivery option is not available on all vehicles. The 10-day time period is calculated from the time you complete and return all of your required paperwork to Vroom.',
    tooltipText3:
      'Some deliveries may be delayed by weather or for other logistical reasons. In the event that happens, we will work with you to reschedule the delivery.',
  };
  private greatFeatures = {
    id: 'great-features',
    label: 'Great Features',
    color: '#0f3a7b',
    font: '#ffffff',
  };

  @observable greatFeaturesBadgeExperiment?: Experiment;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;

    if (!this.greatFeaturesBadgeExperiment) {
      new ExperimentSDK()
        .getAndLogExperimentClientSide('snd-show-great-features-badge')
        .then((experiment) => {
          if (experiment) {
            this.setGreatFeaturesBadgeExperiment(experiment);
            analyticsHandler.registerExperiment(experiment);
          }
        });
    }
  }

  @action
  setGreatFeaturesBadgeExperiment(experiment: Experiment): void {
    this.greatFeaturesBadgeExperiment = experiment;
  }

  getBanner(): BannerInfo | null {
    const {
      hasStockPhotos,
      leadFlagPhotoUrl,
      soldStatus,
      badges,
    } = this.store.vehicle._source;
    const vehicleServiceAvailability = this.store.isAvailable;
    if (hasStockPhotos || isEmpty(leadFlagPhotoUrl)) {
      return this.availableSoon;
    }
    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      return this.salesPending;
    }
    if (
      this.store.geoShippingExperiment?.assignedVariant === 1 &&
      this.store.vehicle._source.location === 'Stafford'
    ) {
      return this.tenDayDelivery;
    }
    if (
      badges !== null &&
      !!badges.find((badge) => badge.code === GREAT_FEATURES_BADGE) &&
      this.greatFeaturesBadgeExperiment?.assignedVariant === 1
    ) {
      return this.greatFeatures;
    }
    return null;
  }
}

export default StatusBannerViewModel;
