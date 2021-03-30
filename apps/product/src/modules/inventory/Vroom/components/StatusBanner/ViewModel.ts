import { Experiment, ExperimentSDK } from '@vroom-web/experiment-sdk';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';
import { action, observable, makeObservable } from 'mobx';

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

export const GREAT_FEATURES_BADGE_1 = 'auto-combined-drivers-price-and-demand';
export const GREAT_FEATURES_BADGE_2 = 'auto-combined-drivers-demand-only';

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
    makeObservable(this);
  }

  @action
  setGreatFeaturesBadgeExperiment(experiment: Experiment): void {
    this.greatFeaturesBadgeExperiment = experiment;
  }

  showAvailableSoon = (): boolean => {
    const { hasStockPhotos, leadFlagPhotoUrl } = this.store.vehicle._source;
    return hasStockPhotos || isEmpty(leadFlagPhotoUrl);
  };

  showSalePending = (): boolean => {
    const { soldStatus } = this.store.vehicle._source;
    const vehicleServiceAvailability = this.store.isAvailable;
    return (
      soldStatus === SoldStatusInt.SALE_PENDING || !vehicleServiceAvailability
    );
  };

  showTenDayDelivery = (): boolean => {
    const { location } = this.store.vehicle._source;
    return (
      this.store.geoShippingExperiment?.assignedVariant === 1 &&
      location === 'Stafford'
    );
  };

  showGreatFeatures = (): boolean => {
    const { badges } = this.store.vehicle._source;
    return (
      badges !== null &&
      !!badges.find(
        (badge) =>
          badge.code === GREAT_FEATURES_BADGE_1 ||
          badge.code === GREAT_FEATURES_BADGE_2
      ) &&
      this.greatFeaturesBadgeExperiment?.assignedVariant === 1
    );
  };

  getBanner(): BannerInfo | null {
    if (this.showAvailableSoon()) {
      return this.availableSoon;
    }
    if (this.showSalePending()) {
      return this.salesPending;
    }
    if (this.showTenDayDelivery()) {
      return this.tenDayDelivery;
    }
    if (this.showGreatFeatures()) {
      return this.greatFeatures;
    }
    return null;
  }
}

export default StatusBannerViewModel;
