import { InventoryStore } from 'src/modules/inventory/store';
class LegalFooterViewModel {
  private deliveryFee: number;

  constructor(inventoryStore: InventoryStore) {
    this.deliveryFee = inventoryStore.deliveryFee;
  }

  getLegalText(): string[] {
    return [
      `Price displayed does not include: Pre-delivery service charges of $285.50  (MA residents only - $300.50) • Delivery charge of $${this.deliveryFee} • FL, NJ or NY residents only - Electronic registration filing charge of $15.00 • Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.`,
      'Prices are subject to change.',
      'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
    ];
  }
}

export default LegalFooterViewModel;
