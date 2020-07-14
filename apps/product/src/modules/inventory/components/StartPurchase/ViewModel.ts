import {
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';
import Router from 'next/router';

import { InventoryStore } from '../../store';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';

class StartPurchaseViewModel {
  private store: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  private car: Car;
  readonly purchaseText: string = 'Start Purchase';
  readonly availableSoon: string = 'Available Soon';
  readonly findNewMatch: string = 'Find A New Match';

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
  }

  getButtonText(): string {
    const { hasStockPhotos, leadFlagPhotoUrl, soldStatus } = this.car;
    const vehicleServiceAvailability = this.store.isAvailable;
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
    const vehicleServiceAvailability = this.store.isAvailable;
    //Tech Debt: SND-970 soldStatus/Inventory Service Spike
    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      this.analyticsHandler.trackFindANewMatchClicked(product);
      const { makeSlug, modelSlug } = this.car;
      const modelFiltersData = addModel(makeSlug, modelSlug);
      const modelHref = getUrlFromFiltersData(modelFiltersData);
      Router.push(modelHref);
    } else {
      this.analyticsHandler.trackProductAdded(product);
      const url = `/inventory/${Router.query.slug}/submit-contact`;
      Router.push('/inventory/[slug]/submit-contact', url);
    }
  }

  isAvailableSoon = (): boolean => {
    /* TODO
    Replace once the backend team release a new flag.
    From David - the intention is to add an availableSoon flag ASAP
    */
    const { leadFlagPhotoUrl, hasStockPhotos } = this.store.vehicle._source;
    return leadFlagPhotoUrl === '' || hasStockPhotos;
  };
}

export default StartPurchaseViewModel;
