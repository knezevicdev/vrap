import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import { Base64 } from 'js-base64';

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

export const santanderTrackerName = 'santander';
export const santanderGA = 'UA-2348754-1';

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

  trackEmailCaptureSubmit(isValidationError = false): void {
    const event = 'Email Capture Submitted';
    const category = 'Catalog';
    const properties = { isValidationError, category };
    this.track(event, properties);
  }

  trackEmailCaptureErrorShown(): void {
    const event = 'Email Capture Error Shown';
    const category = 'Catalog';
    const properties = { category };
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

  trackSantanderPageViews(url: string): void {
    const urlParams = new URLSearchParams(window.location.search);
    const filtersEncoded = urlParams.get('filters');

    if (filtersEncoded) {
      const decoded = Base64.decode(filtersEncoded);
      const decodedURL = url.replace(filtersEncoded, decoded);
      window &&
        window.ga &&
        window.ga(`${santanderTrackerName}.send`, 'pageview', decodedURL);
      return;
    }

    window &&
      window.ga &&
      window.ga(`${santanderTrackerName}.send`, 'pageview', url);
  }
}

// It probably makes more sense to export a single instance
// than to keep recreating instances all over the place.
// TODO: replace individual instances by importing this instance.
export const analyticsHandler = new AnalyticsHandler();

export default AnalyticsHandler;
