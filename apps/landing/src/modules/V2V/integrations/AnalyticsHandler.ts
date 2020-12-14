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
  trackVinLandingPageViewed(car: Car): void {
    const event = 'Vin Landing Page Viewed';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    // this.track(event, properties);
    console.log(event, properties);
  }

  trackSeeAllVehicleDetailsClicked(car: Car): void {
    const event = 'See Details Clicked';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    // this.track(event, properties);
    console.log(event, properties);
  }

  trackAddToFavoritesClicked(car: Car): void {
    const event = 'Favorites Clicked';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  trackCreateAccountClicked(car: Car): void {
    const event = 'Create Account';
    const vehicle = this.convertToDomain(car);
    const accountCreateType = 'Favorites';
    const properties = { ...vehicle, accountCreateType, category };
    console.log(event, properties);
  }

  trackBuySellTradeVideoPlayed(car: Car): void {
    const event = 'Buy, Sell, Trade, Video Played';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  trackCertificationLinkClicked(car: Car): void {
    const event = 'Certification Link Clicked';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    console.log(event, properties);
  }

  trackLearnMoreClicked(car: Car): void {
    const event = 'Learn More Clicked';
    const vehicle = this.convertToDomain(car);
    const properties = { ...vehicle, category };
    console.log(event, properties);
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
      hasStockPhotos,
      defectPhotos: !!defectPhotos,
      spincarSpinUrl,
      soldStatus,
    };
  };

  private getPhotoType = (car: Car): VehiclePhotoType => {
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
}

export default AnalyticsHandler;
