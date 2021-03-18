/* eslint-disable @typescript-eslint/camelcase */
import { Car, SoldStatusInt } from '@vroom-web/inv-search-networking';
import getConfig from 'next/config';

import {
  analyticsHandler,
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

interface BannerInfo {
  id: string;
  label: string;
  color: string;
  fontColor: string;
  hasBorder: boolean;
}

export const GREAT_FEATURES_BADGE = 'auto-combined-drivers-demand-only';

class CarCardViewModel {
  private readonly carsStore: CarsStore;
  private readonly car: Car;
  private readonly position: number;
  readonly evoxLogo = {
    alt: 'Evox Images',
    src: `${publicRuntimeConfig.BASE_PATH}/components/evox-logo.png`,
  };
  private availableSoon: BannerInfo = {
    id: 'available-soon',
    label: 'Available Soon',
    color: '#bdbdbd',
    fontColor: 'inherit',
    hasBorder: false,
  };
  private salePending: BannerInfo = {
    id: 'sale-pending',
    label: 'Sale Pending',
    color: '#ffd400',
    fontColor: 'inherit',
    hasBorder: false,
  };
  private tenDayDelivery: BannerInfo = {
    id: 'ten-day-delivery',
    label: '10-Day Delivery',
    color: '#0f3a7b',
    fontColor: '#ffffff',
    hasBorder: true,
  };
  private greatFeatures: BannerInfo = {
    id: 'great-features',
    label: 'Great Features',
    color: '#0f3a7b',
    fontColor: '#ffffff',
    hasBorder: true,
  };

  constructor(carsStore: CarsStore, car: Car, position: number) {
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
    return this.car.soldStatus === SoldStatusInt.SALE_PENDING;
  };

  showTenDayDelivery = (): boolean => {
    return (
      this.car.location === 'Stafford' &&
      this.carsStore.geoShippingExperiment?.assignedVariant === 1
    );
  };

  showGreatFeatures = (): boolean => {
    return (
      this.car.badges !== null &&
      !!this.car.badges.find((badge) => badge.code === GREAT_FEATURES_BADGE) &&
      this.carsStore.greatFeaturesBadgeExperiment?.assignedVariant === 1
    );
  };

  getBanner(): BannerInfo | null {
    if (this.showAvailableSoon()) {
      return this.availableSoon;
    }
    if (this.showSalePending()) {
      return this.salePending;
    }
    if (this.showTenDayDelivery()) {
      return this.tenDayDelivery;
    }
    if (this.showGreatFeatures()) {
      return this.greatFeatures;
    }
    return null;
  }

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
    analyticsHandler.trackProductClicked(product);
  };
}

export default CarCardViewModel;
