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
  describe('getListBullets', () => {
    it('getListBullets returns an array of strings', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFee = 799;
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.getListBullets()).toStrictEqual([
        'Pre-delivery service charges of $285.50 (MA residents $385.50)',
        'Delivery fee of $799',
        'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
        'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
      ]);
    });
  });

  describe('getShippingFee', () => {
    it('getShippingFee returns string of shipping fee details', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFee = 899;
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.getShippingFee()).toBe('$899 Shipping');
    });
  });
});
