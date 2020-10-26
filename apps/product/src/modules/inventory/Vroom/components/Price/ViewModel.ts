import { InventoryStore } from 'src/modules/inventory/store';

interface List {
  header: string;
  bullets: string[];
}

class PriceViewModel {
  readonly price: string;
  readonly title: string = 'Pricing';
  readonly list: List = {
    header: 'Price displayed <bold>does not</bold> include:',
    bullets: [
      'Pre-delivery service charges of $285.50 (MA residents only - $300.50)',
      'Delivery charge of $599',
      'FL residents only - Electronic registration filing charge of $8.00',
      'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
    ],
  };
  constructor(store: InventoryStore) {
    this.price = store.vehicle._source.listingPrice.toLocaleString('en-US');
  }
}

export default PriceViewModel;
