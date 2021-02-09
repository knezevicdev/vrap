import { InventoryStore } from 'src/modules/inventory/store';

interface List {
  header: string;
  extra: string;
}

class PriceViewModel {
  private deliveryFee: number;
  readonly price: string;
  readonly title: string = 'Pricing';
  readonly list: List = {
    header: 'Price displayed <bold>does not</bold> include:',
    extra:
      'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
  };

  constructor(inventoryStore: InventoryStore) {
    this.deliveryFee = inventoryStore.deliveryFee;
    this.price = inventoryStore.vehicle._source.listingPrice.toLocaleString(
      'en-US'
    );
  }

  getListBullets(): string[] {
    return [
      'Pre-delivery service charges of $285.50 (MA residents $385.50)',
      `Delivery fee of $${this.deliveryFee}`,
      'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
      'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
    ];
  }
}

export default PriceViewModel;
