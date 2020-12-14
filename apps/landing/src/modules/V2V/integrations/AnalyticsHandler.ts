import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import { Car } from '@vroom-web/inv-search-networking';

const category = 'Landing Page';

export type VehiclePhotoType = 'Illustration' | 'Stock' | 'Vroom' | '360';

export interface Vehicle {
  vin: string;
  year: number;
  sku: number;
  price: number;
  photoType?: VehiclePhotoType;
  hasStockPhotos?: boolean;
  defectPhotos?: boolean;
  spincarSpinUrl?: string | null;
  soldStatus?: number;
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackVinLandingPageViewed(vehicle: Vehicle): void {
    const event = 'Vin Landing Page Viewed';
    const properties = { ...vehicle, category };
    // this.track(event, properties);
    console.log(event, properties);
  }

  trackSeeAllVehicleDetailsClicked(vehicle: Vehicle): void {
    const event = 'See Details Clicked';
    const properties = { ...vehicle, category };
    // this.track(event, properties);
    console.log(event, properties);
  }

  trackAddToFavoritesClicked(vehicle: Vehicle): void {
    const event = 'Favorites Clicked';
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  trackCreateAccountClicked(vehicle: Vehicle): void {
    const event = 'Create Account';
    const accountCreateType = 'Favorites';
    const properties = { ...vehicle, accountCreateType, category };
    console.log(event, properties);
  }

  trackBuySellTradeVideoPlayed(vehicle: Vehicle): void {
    const event = 'Buy, Sell, Trade, Video Played';
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  trackCertificationLinkClicked(vehicle: Vehicle): void {
    const event = 'Certification Link Clicked';
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  trackLearnMoreClicked(vehicle: Vehicle): void {
    const event = 'Learn More Clicked';
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  convertToDomain = (car: Car): Vehicle => {
    const {
      vin,
      year,
      inventoryId: sku,
      listingPrice: price,
      hasStockPhotos,
      defectPhotos,
      spincarSpinUrl,
      soldStatus,
    } = car;
    return {
      vin,
      year,
      sku,
      price,
      photoType: getPhotoType(car),
      hasStockPhotos,
      defectPhotos: !!defectPhotos,
      spincarSpinUrl,
      soldStatus,
    };
  };
}

export default AnalyticsHandler;

const getPhotoType = (car: Car): VehiclePhotoType => {
  const { spincarSpinUrl, hasStockPhotos, leadFlagPhotoUrl } = car;
  if (spincarSpinUrl) {
    return '360';
  }
  if (hasStockPhotos) {
    return 'Stock';
  }
  if (leadFlagPhotoUrl) {
    return 'Vroom';
  }
  return 'Illustration';
};
