import { Car } from '@vroom-web/inv-search-networking';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

interface List {
  header: string;
  extra: string;
}

class PriceViewModel {
  private inventoryStore: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  private readonly car: Car;
  readonly price: string;
  readonly title: string = 'Pricing';
  readonly list: List = {
    header: 'Price displayed <bold>does not</bold> include:',
    extra:
      'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
  };

  constructor(inventoryStore: InventoryStore) {
    this.inventoryStore = inventoryStore;
    this.price = inventoryStore.vehicle._source.listingPrice.toLocaleString(
      'en-US'
    );
    this.analyticsHandler = new AnalyticsHandler();
    this.car = inventoryStore.vehicle._source;
  }

  getListBullets(): string[] {
    return [
      'Pre-delivery service charges of $285.50 (MA residents $385.50)',
      `Delivery fee of $${this.inventoryStore.deliveryFee}`,
      'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
      'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
    ];
  }

  trackToolTipClick(): void {
    const {
      inventoryId: sku,
      make,
      model,
      year,
      vin,
      listingPrice: price,
      consignmentPartnerId: partnerId,
    } = this.car;
    const name = `${year} ${make} ${model}`;
    const product: Product = {
      inventoryType: partnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      year,
      vin,
      price,
      sku,
      name,
    };
    this.analyticsHandler.trackToolTipClicked(product);
  }
}

export default PriceViewModel;
