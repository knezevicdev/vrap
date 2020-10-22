import { Car, SoldStatusInt } from '@vroom-web/inv-search-networking';
import getConfig from 'next/config';
import Router from 'next/router';

import AnalyticsHandler, {
  Product,
  ProductPhotoType,
} from 'src/integrations/AnalyticsHandler';

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
  private readonly car: Car;
  readonly evoxLogo = {
    alt: 'Evox Images',
    src: `${publicRuntimeConfig.BASE_PATH}/components/evox-logo.png`,
  };
  readonly availableSoon: string = 'AVAILABLE SOON';
  readonly salePending: string = 'SALE PENDING';

  constructor(car: Car) {
    this.analyticsHandler = new AnalyticsHandler();
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
    const { makeSlug, modelSlug, year, vin } = this.car;
    return `${publicRuntimeConfig.BASE_PATH}/${makeSlug}-${modelSlug}-${year}-${vin}`;
  }

  navigate = (): void => {
    if (!this.car) {
      return;
    }
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
      makeSlug,
      modelSlug,
    } = this.car;
    const link = `/${makeSlug}-${modelSlug}-${year}-${vin}`;
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
      url: link,
      vin,
      year,
    };
    this.analyticsHandler.trackSimilarClicked(product);
    Router.push(link);
  };
}

export default CarCardViewModel;
