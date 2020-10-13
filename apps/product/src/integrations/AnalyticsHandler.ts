import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

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
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackProductListViewed(products: Product[]): void {
    const event = 'Product List Viewed';
    const category = 'Product';
    const properties = {
      category,
      products,
      nonInteraction: 1,
    };
    this.track(event, properties);
  }

  trackProductClicked(product: Product): void {
    const event = 'Product Clicked';
    const category = 'Product';
    const properties = { ...product, category };
    this.track(event, properties);
  }

  trackSimilarClicked(product: Product): void {
    const event = 'Similar Vehicle PDP Clicked';
    const category = 'Product';
    const properties = { ...product, category };
    this.track(event, properties);
  }

  trackProductViewed(product: Product): void {
    const event = 'Product Viewed';
    const category = 'Product';
    const properties = { ...product, category, nonInteraction: 1 };
    this.track(event, properties);
  }

  trackProductAdded(product: Product): void {
    const event = 'Product Added';
    const category = 'Product';
    const properties = { ...product, category };
    this.track(event, properties);
  }

  trackFindANewMatchClicked(product: Product): void {
    const event = 'Find A New Match Clicked';
    const category = 'Product';
    const properties = { ...product, category };
    this.track(event, properties);
  }

  trackGallerySelection(product: Product, selection: string): void {
    const event = `${selection} Button Clicked`;
    const category = 'Product';
    const properties = { product, category };
    this.track(event, properties);
  }

  trackConditionCTA(): void {
    const event = 'Condition CTA Clicked';
    const category = 'Product';
    const properties = { category };
    this.track(event, properties);
  }

  trackGalleryListView(product: Product, selection: string): void {
    const event = `${selection} Image List Viewed`;
    const category = 'Product';
    const properties = { product, category };
    this.track(event, properties);
  }
}

// It probably makes more sense to export a single instance
// than to keep recreating instances all over the place.
// TODO: replace individual instances by importing this instance.
export const analyticsHandler = new AnalyticsHandler();

export default AnalyticsHandler;
