import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

const category = 'Landing Page';

export type ProductInventoryType = 'Consignment' | 'Vroom';
export type ProductPhotoType = 'Illustration' | 'Stock' | 'Vroom';

export interface Product {
  imageUrl: string;
  inventoryType: ProductInventoryType;
  make: string;
  model: string;
  name: string;
  partnerId?: string;
  photoType?: ProductPhotoType;
  position?: number;
  price: number;
  sku: number;
  soldStatus?: number;
  url?: string;
  vin: string;
  year: number;
  defectPhotos?: boolean;
  hasStockPhotos?: boolean;
  spincarSpinUrl?: string | null;
  pendingDeal?: boolean;
  isAvailableToSell?: boolean;
  vinClusterPrimary?: number | null;
  vinClusterSecondary?: number | null;
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackVinLandingPageViewed(): void {
    const event = 'Vin Landing Page Viewed';
    const properties = { category };
    // this.track(event, properties);
    console.log(event, properties);
  }

  trackSeeAllVehiclesClicked(): void {
    const event = 'See Details Clicked';
    const properties = { category };
    // this.track(event, properties);
    console.log(event, properties);
  }

  trackAddToFavoritesClicked(): void {
    const event = 'Favorites Clicked';
    const properties = { category };
    console.log(event, properties);
  }

  trackCreateAccountClicked(): void {
    const event = 'Create Account';
    const accountCreateType = 'Favorites';
    const properties = { accountCreateType, category };
    console.log(event, properties);
  }

  trackBuySellTradeVideoPlayed(): void {
    const event = 'Buy, Sell, Trade, Video Played';
    const properties = { category };
    console.log(event, properties);
  }

  trackCertificationLinkClicked(): void {
    const event = 'Certification Link Clicked';
    const properties = { category };
    console.log(event, properties);
  }

  trackLearnMoreClicked(): void {
    const event = 'Learn More Clicked';
    const properties = { category };
    console.log(event, properties);
  }
}

export default AnalyticsHandler;
