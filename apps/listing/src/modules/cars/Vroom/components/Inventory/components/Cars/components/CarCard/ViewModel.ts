/* eslint-disable @typescript-eslint/camelcase */
import { Car, SoldStatusInt } from '@vroom-web/inv-search-networking';
import getConfig from 'next/config';

import AnalyticsHandler, {
  Product,
  ProductPhotoType,
} from 'src/integrations/AnalyticsHandler';
import { CarsStore } from 'src/modules/cars/store';

const { publicRuntimeConfig } = getConfig();

interface Summary {
  image: string;
  title: string;
  trim: string;
  miles: string;
  price: string;
}

class CarCardViewModel {
  private analyticsHandler: AnalyticsHandler;
  private readonly carsStore: CarsStore;
  private readonly car: Car;
  private readonly position: number;
  readonly evoxLogo = {
    alt: 'Evox Images',
    src: `${publicRuntimeConfig.BASE_PATH}/components/evox-logo.png`,
  };
  readonly availableSoon: string = 'Available Soon';
  readonly salePending: string = 'Sale Pending';
  readonly tenDayDelivery: string = '10-Day Delivery';

  constructor(carsStore: CarsStore, car: Car, position: number) {
    this.analyticsHandler = new AnalyticsHandler();
    this.carsStore = carsStore;
    this.car = car;
    this.position = position;
  }

  private getPhotoType(): ProductPhotoType {
    const { hasStockPhotos, leadFlagPhotoUrl } = this.car;
    if (hasStockPhotos) {
      return 'Stock';
    }
    if (leadFlagPhotoUrl) {
      return 'Vroom';
    }
    return 'Illustration';
  }

  showLogo = (): boolean => {
    return !!this.car.leadFlagPhotoUrl && this.car.hasStockPhotos;
  };

  showAvailableSoon = (): boolean => {
    return this.car.leadFlagPhotoUrl === '' || this.car.hasStockPhotos;
  };

  showSalePending = (): boolean => {
    return (
      !this.showAvailableSoon() &&
      this.car.soldStatus === SoldStatusInt.SALE_PENDING
    );
  };

  showTenDayDelivery = (): boolean => {
    return (
      this.car.location === 'Stafford' &&
      this.carsStore.geoShippingExperiment?.assignedVariant === 1 &&
      !this.showSalePending() &&
      !this.showAvailableSoon()
    );
  };

  getPhotoStyle = (): { opacity: string } => {
    const { leadFlagPhotoUrl } = this.car;

    const opacity = leadFlagPhotoUrl ? '100%' : '30%';
    return { opacity: opacity };
  };

  getSummary(): Summary {
    const {
      leadFlagPhotoUrl,
      year,
      make,
      model,
      trim,
      miles,
      listingPrice,
    } = this.car;

    const noPhoto = `${publicRuntimeConfig.BASE_PATH}/components/ghost-suv-with-padding.png`;
    const image = leadFlagPhotoUrl || noPhoto;

    return {
      image: image,
      title: `${year} ${make} ${model}`,
      trim,
      miles: `${miles.toLocaleString('en-US')} miles`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }

  link(): string {
    // FIT-583
    // Persist key attribution query params across navigation.
    // This is a stopgap so that vlassic attributuion works.
    // TODO: We should come back and remove this when a better attribution system is in place.
    const attributionQueryString =
      this.carsStore.attributionQueryString !== ''
        ? `?${this.carsStore.attributionQueryString}`
        : '';
    const { makeSlug, modelSlug, vin, year } = this.car;

    let tddQuery = '';
    if (this.showTenDayDelivery()) {
      tddQuery = `${attributionQueryString ? '&' : '?'}tdd=true`;
    }

    return `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}${attributionQueryString}${tddQuery}`;
  }

  trackProductClick = (): void => {
    const {
      consignmentPartnerId,
      inventoryId,
      leadFlagPhotoUrl,
      year,
      make,
      model,
      listingPrice,
      vin,
      soldStatus,
    } = this.car;
    const name = `${year} ${make} ${model}`;
    const photoType = this.getPhotoType();
    const merchandising = {
      merchandisingBadge: this.showTenDayDelivery(),
      ...(this.showTenDayDelivery()
        ? { merchandisingBadgeType: 'Ten Day Delivery' }
        : {}),
    };
    const product: Product = {
      imageUrl: leadFlagPhotoUrl,
      inventoryType: consignmentPartnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      name,
      partnerId: consignmentPartnerId,
      photoType,
      price: listingPrice,
      sku: inventoryId,
      soldStatus,
      url: this.link(),
      vin,
      year,
      position: this.position,
      ...merchandising,
    };
    this.analyticsHandler.trackProductClicked(product);
  };
}

export default CarCardViewModel;
