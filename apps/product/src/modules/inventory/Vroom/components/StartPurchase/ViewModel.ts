/* eslint-disable @typescript-eslint/camelcase */
import {
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import isEmpty from 'lodash.isempty';
import { stringify } from 'qs';
import { ParsedUrlQuery } from 'querystring';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

class StartPurchaseViewModel {
  private store: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  private car: Car;
  private query: ParsedUrlQuery;
  readonly purchaseText: string = 'Start Purchase';
  readonly availableSoon: string = 'Available Soon';
  readonly findNewMatch: string = 'Find A New Match';

  constructor(query: ParsedUrlQuery, inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
    this.query = query;
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
    // FIT-582
    // Persist attributuion query params across navigation.
    // This is a stopgap so vlassic attributuion works.
    // TODO: remove query param persistence when a better attribution system is in place.
    const {
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    } = this.query;
    const attributionQueryString = stringify({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    });
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
      const queryStringPrefix = modelHref.indexOf('?') == -1 ? `?` : `&`;
      window.location.href = `${modelHref}${queryStringPrefix}${attributionQueryString}`;
    } else {
      this.analyticsHandler.trackProductAdded(product);
      const url = `/e2e/${vin}/checkoutTradeIn?${attributionQueryString}`;
      window.location.href = url;
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