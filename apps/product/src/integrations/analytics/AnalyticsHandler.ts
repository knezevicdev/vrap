import {
  identify as segmentIdentify,
  page as segmentPage,
  track as segmentTrack,
} from './segment';

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
}

interface Filter {
  type: string;
  value: any;
}

type Sort = any;

export type TrackProductSearchedCategory = 'Home' | 'Catalog' | 'Product';
export type TrackProductSearchedLabel = 'Autocomplete' | 'Free Form';

class AnalyticsHandler {
  private track(event: string, properties?: object): void {
    segmentTrack(event, properties);
  }

  page(name: string, category?: string): void {
    const properties = {
      category,
      name,
    };
    segmentPage(name, properties);
  }

  identify(traits: object, userId?: string): void {
    segmentIdentify(traits, userId);
  }

  trackProductSearched(
    category: TrackProductSearchedCategory,
    label: TrackProductSearchedLabel,
    query: string
  ): void {
    const event = 'Product Searched';
    const properties = {
      category,
      label,
      query,
    };
    this.track(event, properties);
  }

  trackProductListViewed(products: Product[]): void {
    const event = 'Product List Viewed';
    const category = 'Catalog';
    const properties = {
      category,
      products,
      nonInteraction: 1,
    };
    this.track(event, properties);
  }

  trackProductListFiltered(
    products: Product[],
    filters: Filter[],
    sort?: Sort
  ): void {
    const event = 'Product List Filtered';
    const category = 'Catalog';
    const properties = {
      category: category,
      products: products,
      filters,
      sort,
    };
    this.track(event, properties);
  }

  trackProductClicked(product: Product): void {
    const event = 'Product Clicked';
    const category = 'Catalog';
    const properties = { ...product, category };
    this.track(event, properties);
  }

  trackContactSubmitted(product: Product): void {
    const event = 'Contact Submitted';
    const category = 'Lead Submission';
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

  trackGallerySelection(selection: string): void {
    const event = `${selection} Button Clicked`;
    const category = 'Product';
    const action = 'Clicked';
    const properties = { tab: selection, action, category };
    this.track(event, properties);
  }

  trackConditionCTA(): void {
    const event = 'Condition CTA Clicked';
    const category = 'Product';
    const action = 'Clicked';
    const properties = { action, category };
    this.track(event, properties);
  }

  trackGalleryListView(selection: string): void {
    const event = `${selection} Image List Viewed`;
    const category = 'Product';
    const action = 'Viewed';
    const properties = { action, category };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
