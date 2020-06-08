import { Car } from '@vroom-web/inv-search-networking';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler, {
  Product,
  ProductPhotoType,
} from 'src/integrations/analytics/AnalyticsHandler';

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
    src: `${globalEnv.CDN_URL}/components/evox-logo.png`,
  };
  readonly availableSoon: string = 'AVAILABLE SOON';

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

    const noPhoto = `${globalEnv.CDN_URL}/components/ghost-suv-with-padding.png`;
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
    return `/inventory/${this.car.vin}`;
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
