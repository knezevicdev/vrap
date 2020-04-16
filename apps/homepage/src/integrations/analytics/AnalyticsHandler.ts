import {
  identify as segmentIdentify,
  page as segmentPage,
  track as segmentTrack,
} from './segment';

interface Product {
  imageUrl: string;
  make: string;
  model: string;
  name: string;
  price: number;
  sku: number;
  soldStatus?: number;
  url?: string;
  vin: string;
  year: number;
}

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
    category: 'Home' | 'Catalog' | 'Product',
    label: 'Autocomplete' | 'Free Form',
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

  trackProductClicked(product: Product): void {
    const event = 'Product Clicked';
    const category = 'Catalog';
    const {
      imageUrl,
      make,
      model,
      name,
      price,
      soldStatus,
      url,
      vin,
      year,
    } = product;
    const properties = {
      category,
      imageUrl,
      make,
      model,
      name,
      price,
      soldStatus,
      url,
      vin,
      year,
    };
    this.track(event, properties);
  }

  trackContactSubmitted(product: Product): void {
    const event = 'Contact Submitted';
    const category = 'Lead Submission';
    const { make, model, name, price, sku, vin, year } = product;
    const properties = {
      category,
      make,
      model,
      name,
      price,
      sku,
      vin,
      year,
    };
    this.track(event, properties);
  }

  trackProductViewed(product: Product): void {
    const event = 'Product Viewed';
    const category = 'Product';
    const properties = { ...product, category };
    this.track(event, properties);
  }

  trackProductAdded(product: Product): void {
    const event = 'Product Added';
    const category = 'Product';
    const properties = { ...product, category };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
