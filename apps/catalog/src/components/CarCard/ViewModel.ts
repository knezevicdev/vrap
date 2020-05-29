import Router from 'next/router';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler, {
  Product,
  ProductPhotoType,
} from 'src/integrations/analytics/AnalyticsHandler';
import { Car } from 'src/networking/models/Inventory.v3';

interface Summary {
  image: string;
  title: string;
  trim: string;
  miles: string;
  price: string;
}

class CarCardViewModel {
  private analyticsHandler: AnalyticsHandler;
  private readonly car?: Car;
  readonly evoxLogo = {
    alt: 'Evox Images',
    src: `${globalEnv.CDN_URL}/components/evox-logo.png`,
  };
  readonly availableSoon: string = 'AVAILABLE SOON';

  private getPhotoType(): ProductPhotoType {
    if (!this.car) {
      return 'Illustration';
    }
    const { hasStockPhotos, leadFlagPhotoUrl } = this.car;
    if (hasStockPhotos) {
      return 'Stock';
    }
    if (leadFlagPhotoUrl) {
      return 'Vroom';
    }
    return 'Illustration';
  }

  constructor(car?: Car) {
    this.analyticsHandler = new AnalyticsHandler();
    this.car = car;
  }

  loading(): boolean {
    return !this.car;
  }

  showLogo = (): boolean => {
    if (this.car) {
      // FIT-445 this logic should only need to check whether "hasStockPhotos" is true.
      // However, the backend is returning cars where that field is true, even though there aren't any photos.
      // For now, we're checking that "leadFlagPhotoUrl" exists so we don't display a logo if there aren't any photos.
      // Eventually, the backend data should be fixed and this can simply use "hasStockPhotos".
      return !!this.car.leadFlagPhotoUrl && this.car.hasStockPhotos;
    }
    return false;
  };

  showAvailableSoon = (): boolean => {
    /* TODO
    Replace once the backend team release a new flag.
    From David - the intention is to add an availableSoon flag ASAP
    */
    if (this.car) {
      return this.car.leadFlagPhotoUrl === '' || this.car.hasStockPhotos;
    }
    return false;
  };

  getSummary(): Summary {
    if (!this.car) {
      return {
        image: '',
        title: '',
        trim: '',
        miles: '',
        price: '',
      };
    }
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

  navigate = (): void => {
    if (!this.car) {
      return;
    }
    const link = `/inventory/${this.car.vin}`;
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
      url: link,
      vin,
      year,
    };
    this.analyticsHandler.trackProductClicked(product);
    Router.push(link);
  };
}

export default CarCardViewModel;
