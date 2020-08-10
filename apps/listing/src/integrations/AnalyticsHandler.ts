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
}

interface Filter {
  type: string;
  value: any;
}

type Sort = any;

class AnalyticsHandler extends BaseAnalyticsHandler {
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

  trackProductSearched(
    label: 'Autocomplete' | 'Free Form',
    query: string
  ): void {
    const event = 'Product Searched';
    const properties = {
      category: 'Catalog',
      label,
      query,
    };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
