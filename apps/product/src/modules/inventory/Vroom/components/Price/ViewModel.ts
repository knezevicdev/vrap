import { InventoryStore } from 'src/modules/inventory/store';

interface List {
  header: string;
  bullets: string[];
  extra: string;
}

class PriceViewModel {
  readonly price: string;
  readonly title: string = 'Pricing';
  readonly list: List = {
    header: 'Price displayed <bold>does not</bold> include:',
    bullets: [
      'Pre-delivery service charges of $285.50 (MA residents $385.50)',
      'Delivery fee of $599',
      'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
      'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
    ],
    extra:
      'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
  };
  constructor(store: InventoryStore) {
    this.price = store.vehicle._source.listingPrice.toLocaleString('en-US');
  }
}

export default PriceViewModel;
