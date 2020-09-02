import getConfig from 'next/config';

import { RedirectStore } from './store';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

const { publicRuntimeConfig } = getConfig();

class ViewModel {
  private readonly redirectStore: RedirectStore;

  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  readonly image = {
    alt: 'Exit Santander',
    src: `${publicRuntimeConfig.BASE_PATH}/modules/inventory/components/exit-santander.png`,
  };
  readonly message: string =
    'We’re now sending you to Vroom to continue your purchase.';
  readonly begin: string = 'You’ll be redirected in ';
  readonly end: string = ' seconds';

  constructor(inventoryStore: InventoryStore, redirectStore: RedirectStore) {
    this.redirectStore = redirectStore;

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
    } = inventoryStore.vehicle._source;

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

    setInterval(() => {
      this.redirectStore.decrementSeconds();
      if (this.redirectStore.secondsLeft === 0) {
        this.analyticsHandler.trackProductAdded(product);
        const url = `https://www.vroom.com/e2e/${vin}/checkoutTradeIn?utm_source=santander&utm_campaign=national&utm_medium=listings&vit_source=santanderconsumerusa&vit_medium=wl&vit_dest=vroom`;
        window.location.href = url;
      }
    }, 1000);
  }

  getSecondsLeft = (): number => {
    return this.redirectStore.secondsLeft;
  };
}

export default ViewModel;
