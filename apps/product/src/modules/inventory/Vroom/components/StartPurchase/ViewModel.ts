/* eslint-disable @typescript-eslint/camelcase */
import {
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import { stringify } from 'qs';
import { ParsedUrlQuery } from 'querystring';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';
import {
  DealStatus,
  StartPurchaseStore,
} from 'src/modules/inventory/Vroom/components/StartPurchase/store';

class StartPurchaseViewModel {
  private store: InventoryStore;
  private startPurchaseStore: StartPurchaseStore;
  private analyticsHandler: AnalyticsHandler;
  private car: Car;
  private query: ParsedUrlQuery;
  private vroomUrl: string;
  readonly purchaseText: string = 'Start Purchase';
  readonly findNewMatch: string = 'Find A New Match';

  constructor(
    query: ParsedUrlQuery,
    inventoryStore: InventoryStore,
    startPurchaseStore: StartPurchaseStore,
    vroomUrl: string
  ) {
    this.store = inventoryStore;
    this.startPurchaseStore = startPurchaseStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
    this.query = query;
    this.vroomUrl = vroomUrl;
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

  // TODO: 'step' and all the cases in the switch should use an enum.
  // We need to export an enum from the networking library for deals.
  getResumeStepHref(step: string, vin: string): string {
    const urlDict: { [key: string]: string } = {
      TradeIn: 'checkoutTradeIn',
      RegistrationAddress: 'registration',
      DeliveryAddress: 'delivery-form',
      Financing: 'vroomFinancing',
      PaymentType: 'payment',
      DepositPaymentInfo: 'dealReview',
      DealSummary: 'congratulations',
      FinancingOption: 'autofi',
      FinancingPending: 'autofi',
      BackendProducts: 'dealCoverage',
      Review: 'dealReview',
      DocumentUpload: 'documentUpload',
      TradeInLoanInfo: 'tradeInLoanInfo',
      TradeInVehicle: 'vehicleTradeIn',
    };
    const stepUrl: string | undefined = urlDict[step];
    const targetUrl: string = stepUrl === 'vehicleTradeIn' ? 'checkout' : 'e2e';
    return `/${targetUrl}/${vin}/${
      stepUrl ? stepUrl : `my-account/transactions`
    }`;
  }

  showTenDayDelivery(): boolean {
    const result =
      this.store.geoShippingExperiment?.assignedVariant === 1 &&
      this.store.vehicle._source.location === 'Stafford';
    return result || false;
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

    const merchandising = {
      merchandisingBadge: this.showTenDayDelivery(),
      ...(this.showTenDayDelivery()
        ? { merchandisingBadgeType: 'Ten Day Delivery' }
        : {}),
    };

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
      ...(this.startPurchaseStore.dealStatus === DealStatus.PENDING
        ? {
            pendingDeal: true,
          }
        : {}),
      ...merchandising,
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

    const { makeSlug, modelSlug } = this.car;
    const modelFiltersData = addModel(makeSlug, modelSlug);
    const modelHref = getUrlFromFiltersData(modelFiltersData);
    const queryStringPrefix = modelHref.indexOf('?') == -1 ? `?` : `&`;

    // if we don't have any query params to include, don't append prefix
    const finalQueryString = attributionQueryString
      ? queryStringPrefix + attributionQueryString
      : '';

    if (
      soldStatus === SoldStatusInt.SALE_PENDING ||
      !vehicleServiceAvailability
    ) {
      this.analyticsHandler.trackFindANewMatchClicked(product);

      window.location.href = `${modelHref}${finalQueryString}`;
    } else {
      const queryPrefix = finalQueryString ? '&' : '?';
      const tenDayDelivery = this.showTenDayDelivery()
        ? queryPrefix + 'tdd=true'
        : '';
      this.analyticsHandler.trackProductAdded(product);
      let route;
      if (this.startPurchaseStore.dealStatus === DealStatus.IN_PROGRESS) {
        if (this.startPurchaseStore.vin === vin) {
          route = `${this.getResumeStepHref(
            this.startPurchaseStore.step,
            this.startPurchaseStore.vin
          )}${finalQueryString}${tenDayDelivery}`;
        } else {
          route = `/e2e/${vin}/${'dealSelectionScreen'}${finalQueryString}${tenDayDelivery}`;
        }
      } else {
        route = `/e2e/${vin}/${'checkoutTradeIn'}${finalQueryString}${tenDayDelivery}`;
      }

      window.location.href = `${this.vroomUrl}${route}`;
    }
  }
}

export default StartPurchaseViewModel;
