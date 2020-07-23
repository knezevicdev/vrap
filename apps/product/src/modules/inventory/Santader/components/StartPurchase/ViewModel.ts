import {
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';

import { Store } from './store';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

class StartPurchaseViewModel {
  private inventoryStore: InventoryStore;
  private store: Store;
  private analyticsHandler: AnalyticsHandler;
  private car: Car;
  readonly purchaseText: string = 'Start Purchase';
  readonly availableSoon: string = 'Available Soon';
  readonly findNewMatch: string = 'Find A New Match';
  readonly poweredBy = 'Powered by';

  constructor(inventoryStore: InventoryStore, store: Store) {
    this.inventoryStore = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
    this.store = store;
  }

  getButtonText(): string {
    const { hasStockPhotos, leadFlagPhotoUrl, soldStatus } = this.car;
    const vehicleServiceAvailability = this.inventoryStore.isAvailable;
    if (hasStockPhotos || isEmpty(leadFlagPhotoUrl)) {
      return this.availableSoon;
    }
    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      return this.findNewMatch;
    }
    return this.purchaseText;
  }

  handleClick(): void {
    const {
      consignmentPartnerId: partnerId,
      inventoryId: sku,
      leadPhotoUrl: imageUrl,
      listingPrice: price,
      make,
      model,
      vin,
      year,
      defectPhotos,
      soldStatus,
    } = this.car;
    const name = `${year} ${make} ${model}`;
    const product: Product = {
      imageUrl,
      inventoryType: partnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      name,
      partnerId,
      price,
      sku,
      vin,
      year,
      defectPhotos: !!defectPhotos,
    };
    const vehicleServiceAvailability = this.inventoryStore.isAvailable;
    //Tech Debt: SND-970 soldStatus/Inventory Service Spike
    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      this.analyticsHandler.trackFindANewMatchClicked(product);
      const { makeSlug, modelSlug } = this.car;
      const modelFiltersData = addModel(makeSlug, modelSlug);
      const modelHref = getUrlFromFiltersData(modelFiltersData);
      window.location.href = modelHref;
    } else {
      this.store.setShowRedirectToTrue();
      setTimeout(() => {
        this.analyticsHandler.trackProductAdded(product);
        const url = `/e2e/${vin}/checkoutTradeIn`;
        window.location.href = url;
      }, 6000);
    }
  }

  showRedirect = (): boolean => {
    return this.store.showRedirect;
  };

  isAvailableSoon = (): boolean => {
    /* TODO
    Replace once the backend team release a new flag.
    From David - the intention is to add an availableSoon flag ASAP
    */
    const {
      leadFlagPhotoUrl,
      hasStockPhotos,
    } = this.inventoryStore.vehicle._source;
    return leadFlagPhotoUrl === '' || hasStockPhotos;
  };
}

export default StartPurchaseViewModel;
