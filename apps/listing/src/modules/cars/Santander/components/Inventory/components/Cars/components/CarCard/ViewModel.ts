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
  readonly evoxLogo = {
    alt: 'Evox Images',
    src: `${publicRuntimeConfig.BASE_PATH}/components/evox-logo.png`,
  };
  readonly availableSoon: string = 'AVAILABLE SOON';
  readonly salePending: string = 'SALE PENDING';

  constructor(carsStore: CarsStore, car: Car) {
    this.analyticsHandler = new AnalyticsHandler();
    this.carsStore = carsStore;
    this.car = car;
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
    // FIT-445 this logic should only need to check whether "hasStockPhotos" is true.
    // However, the backend is returning cars where that field is true, even though there aren't any photos.
    // For now, we're checking that "leadFlagPhotoUrl" exists so we don't display a logo if there aren't any photos.
    // Eventually, the backend data should be fixed and this can simply use "hasStockPhotos".
    return !!this.car.leadFlagPhotoUrl && this.car.hasStockPhotos;
  };

  showAvailableSoon = (): boolean => {
    /* TODO
    Replace once the backend team release a new flag.
    From David - the intention is to add an availableSoon flag ASAP
    */
    return this.car.leadFlagPhotoUrl === '' || this.car.hasStockPhotos;
  };

  showSalePending = (): boolean => {
    return (
      !this.showAvailableSoon() &&
      this.car.soldStatus === SoldStatusInt.SALE_PENDING
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
    //TODO: Replace vehicle -> inventory after AB test
    return `/vehicle/${makeSlug}-${modelSlug}-${year}-${vin}${attributionQueryString}`;
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
    };
    this.analyticsHandler.trackProductClicked(product);
  };
}

export default CarCardViewModel;
