/* eslint-disable @typescript-eslint/camelcase */
import {
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { SoldStatusInt } from '@vroom-web/inv-service-networking';
import { stringify } from 'qs';

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
  private vroomUrl: string;
  readonly purchaseText: string = 'Start Purchase';
  readonly availableSoon: string = 'Available Soon';
  readonly findNewMatch: string = 'Find A New Match';
  readonly poweredBy = 'Powered by';

  constructor(
    inventoryStore: InventoryStore,
    startPurchaseStore: StartPurchaseStore,
    vroomUrl: string
  ) {
    this.store = inventoryStore;
    this.startPurchaseStore = startPurchaseStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
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
  private getResumeStepHref(step: string, vin: string): string {
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
    };
    const stepUrl: string | undefined = urlDict[step];
    return `/e2e/${vin}/${stepUrl ? stepUrl : `my-account/transactions`}`;
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
      ...(this.startPurchaseStore.dealStatus === DealStatus.PENDING
        ? {
            pendingDeal: true,
          }
        : {}),
    };
    // FIT-582
    // Persist attributuion query params across navigation.
    // This is a stopgap so vlassic attributuion works.
    // TODO: remove query param persistence when a better attribution system is in place.
    const attributionQueryString = stringify({
      utm_source: 'santander',
      utm_medium: 'listings',
      utm_campaign: 'national',
      vit_source: 'santanderconsumerusa',
      vit_medium: 'wl',
      vit_dest: 'vroom',
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
      this.analyticsHandler.trackProductAdded(product);

      let route;
      if (this.startPurchaseStore.dealStatus === DealStatus.IN_PROGRESS) {
        if (this.startPurchaseStore.vin === vin) {
          route = `${this.getResumeStepHref(
            this.startPurchaseStore.step,
            this.startPurchaseStore.vin
          )}${finalQueryString}`;
        } else {
          route = `/e2e/${vin}/${'dealSelectionScreen'}${finalQueryString}`;
        }
      } else {
        route = `/e2e/${vin}/${'checkoutTradeIn'}${finalQueryString}`;
      }

      window.location.href = `${this.vroomUrl}${route}`;
    }
  }

  isAvailableSoon = (): boolean => {
    const { leadFlagPhotoUrl, hasStockPhotos } = this.store.vehicle._source;

    return leadFlagPhotoUrl === '' || hasStockPhotos;
  };
}

export default StartPurchaseViewModel;
