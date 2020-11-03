/* eslint-disable @typescript-eslint/camelcase */
import {
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import getConfig from 'next/config';
import { stringify } from 'qs';
import { ParsedUrlQuery } from 'querystring';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';
import { StartPurchaseStore } from 'src/modules/inventory/Vroom/components/StartPurchase/store';
import { Status } from 'src/networking/types';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();
class StartPurchaseViewModel {
  private store: InventoryStore;
  private startPurchaseStore: StartPurchaseStore;
  private analyticsHandler: AnalyticsHandler;
  private car: Car;
  private query: ParsedUrlQuery;
  readonly purchaseText: string = 'Start Purchase';
  readonly findNewMatch: string = 'Find A New Match';

  constructor(
    query: ParsedUrlQuery,
    inventoryStore: InventoryStore,
    startPurchaseStore: StartPurchaseStore
  ) {
    this.store = inventoryStore;
    this.startPurchaseStore = startPurchaseStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
    this.query = query;
  }

  getButtonText(): string {
    const { soldStatus } = this.car;
    const vehicleServiceAvailability = this.store.isAvailable;
    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      return this.findNewMatch;
    }
    return this.purchaseText;
  }

  handleMount(): void {
    this.startPurchaseStore.initClientSide();
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
      ...(this.startPurchaseStore.inProgressDealStatus === Status.SUCCESS
        ? {
            pendingDeal: true,
          }
        : {}),
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
    const tdaQueryParams =
      '&vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA';
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
      const url = `${VROOM_URL}/e2e/${vin}/checkoutTradeIn?${attributionQueryString}${tdaQueryParams}`;
      window.location.href = url;
    }
  }
}

export default StartPurchaseViewModel;
