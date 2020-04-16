import Router from 'next/router';

import { InventoryStore } from '../../store';

import AnalyticsHandler from 'src/integrations/analytics/AnalyticsHandler';

class StartPurchaseViewModel {
  private store: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly purchaseText: string = 'Start Purchase';

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleClick(): void {
    const {
      inventoryId: sku,
      leadPhotoUrl: imageUrl,
      listingPrice: price,
      make,
      model,
      vin,
      year,
    } = this.store.vehicle._source;
    const name = `${year} ${make} ${model}`;
    const product = {
      imageUrl,
      make,
      model,
      name,
      price,
      sku,
      vin,
      year,
    };

    this.analyticsHandler.trackProductAdded(product);
    const url = `/inventory/${Router.query.slug}/submit-contact`;
    Router.push('/inventory/[slug]/submit-contact', url);
  }
}

export default StartPurchaseViewModel;
