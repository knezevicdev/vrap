import { reaction } from 'mobx';

import { InventoryStore } from './store';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { Status } from 'src/networking/types';

class InventoryViewModel {
  private store: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  private disposeReaction?: () => void;
  readonly errorTop: string = 'Looks like that car is no longer available.';
  readonly errorBottom: string = 'Check out more options.';
  readonly disclaimer: string = `* Prices are subject to change and exclude all tax,
        title, tags, and other fees, which will be calculated at the time of
        purchase. We make every effort to provide accurate vehicle information on
        this page, but please verify before purchasing.`;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  private trackProductViewed(): void {
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
    this.analyticsHandler.trackProductViewed(product);
  }

  startReaction(): void {
    this.disposeReaction = reaction(
      () => this.store.vehicleStatus,
      (status) => {
        if (status === Status.SUCCESS) {
          this.trackProductViewed();
        }
      },
      {
        fireImmediately: true,
      }
    );
  }

  stopReaction(): void {
    if (this.disposeReaction) {
      this.disposeReaction();
    }
  }

  loading(): boolean {
    const result =
      this.store.vehicleStatus === Status.FETCHING ||
      this.store.vehicleStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.vehicleStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.vehicleStatus === Status.ERROR;
  }
}

export default InventoryViewModel;
