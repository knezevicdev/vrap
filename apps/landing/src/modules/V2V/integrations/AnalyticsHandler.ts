import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import { Car } from '@vroom-web/inv-search-networking';

const category = 'Landing Page';

export type VehiclePhotoType = 'Illustration' | 'Stock' | 'Vroom';

export interface Vehicle {
  vin: string;
  year: number;
  sku: number;
  price: number;
  photoType?: VehiclePhotoType;
  has360?: boolean;
  hasStockPhotos?: boolean;
  defectPhotos?: boolean;
  spincarSpinUrl?: string | null;
  soldStatus?: number;
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackVinLandingPageViewed(car: Car): void {
    const event = 'Vin Landing Page Viewed';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    this.track(event, properties);
  }

  trackSeeAllVehicleDetailsClicked(car: Car): void {
    const event = 'See Details Clicked';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    this.track(event, properties);
  }

  trackAddToFavoritesClicked(car: Car): void {
    const event = 'Favorites Clicked';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    this.track(event, properties);
  }

  trackCreateAccountClicked(car: Car): void {
    const event = 'Create Account';
    const vehicle = this.convertToDomain(car);
    const accountCreateType = 'Favorites';
    const properties = { ...vehicle, accountCreateType, category };
    this.track(event, properties);
  }
  //Needs research
  trackBuySellTradeVideoPlayed(car: Car): void {
    const event = 'Buy, Sell, Trade, Video Played';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    this.track(event, properties);
  }

  private convertToDomain = (car: Car): Vehicle => {
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
      photoType: this.getPhotoType(car),
      has360: !!spincarSpinUrl,
      hasStockPhotos,
      defectPhotos: !!defectPhotos,
      spincarSpinUrl,
      soldStatus,
    };
  };

  private getPhotoType = (car: Car): VehiclePhotoType => {
    const { hasStockPhotos, leadFlagPhotoUrl } = car;
    if (hasStockPhotos) {
      return 'Stock';
    }
    if (leadFlagPhotoUrl) {
      return 'Vroom';
    }
    return 'Illustration';
  };
}

export default AnalyticsHandler;
