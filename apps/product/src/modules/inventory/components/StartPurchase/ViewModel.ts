import Router from 'next/router';

import { InventoryStore } from '../../store';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';

class StartPurchaseViewModel {
  private store: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly purchaseText: string = 'Start Purchase';
  readonly availableSoon: string = 'Available Soon';

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleClick(): void {
    const {
      consignmentPartnerId: partnerId,
      inventoryId: sku,
      leadPhotoUrl: imageUrl,
      listingPrice: price,
      make,
      model,
      vin,
      year,
      defectPhotos,
    } = this.store.vehicle._source;
    const name = `${year} ${make} ${model}`;
    const product: Product = {
      imageUrl,
      inventoryType: partnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      name,
      partnerId,
      price,
      sku,
      vin,
      year,
      defectPhotos: !!defectPhotos,
    };

    this.analyticsHandler.trackProductAdded(product);
    const url = `/inventory/${Router.query.slug}/submit-contact`;
    Router.push('/inventory/[slug]/submit-contact', url);
  }

  isAvailableSoon = (): boolean => {
    /* TODO
    Replace once the backend team release a new flag.
    From David - the intention is to add an availableSoon flag ASAP
    */
    const { leadFlagPhotoUrl, hasStockPhotos } = this.store.vehicle._source;
    return leadFlagPhotoUrl === '' || hasStockPhotos;
  };
}

export default StartPurchaseViewModel;
