import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreState,
} from 'src/modules/inventory/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Price ViewModel Tests', () => {
  describe('getLegalText', () => {
    it('getLegalText returns an array of strings', () => {
      const invInitialState = {} as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFee = 799;
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.getLegalText()).toStrictEqual([
        'Price displayed does not include: Pre-delivery service charges of $285.50  (MA residents only - $300.50) • Delivery charge of $799 • FL, NJ or NY residents only - Electronic registration filing charge of $15.00, or applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
        'Prices are subject to change.',
        'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
      ]);
    });
  });
});
