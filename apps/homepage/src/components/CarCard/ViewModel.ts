import Router from 'next/router';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/analytics/AnalyticsHandler';
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

  constructor(car?: Car) {
    this.analyticsHandler = new AnalyticsHandler();
    this.car = car;
  }

  loading(): boolean {
    return !this.car;
  }

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

    const noPhoto = `${globalEnv.CDN_URL}/static-rebrand/img/error/no_image.jpg`;
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
    const product = {
      imageUrl: leadFlagPhotoUrl,
      make,
      model,
      name,
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
