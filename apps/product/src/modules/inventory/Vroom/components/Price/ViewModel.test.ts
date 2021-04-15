import { Client } from '@vroom-web/networking';

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

beforeEach(() => {
  const BASE_URL = '';
  const gearboxClient = new Client(BASE_URL);
  gearboxClient.gqlRequest = jest
    .fn()
    .mockResolvedValue({ data: { taxiGetShippingFee: { fee: 499 } } });
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

  describe('showShippingFee', () => {
    it('showShippingFee returns false when showVisibleShippingFee is false and deliveryFeeHasSucceeded is false and deliveryFeeHasFailed is false', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.showShippingFee()).toBe(false);
    });
    it('showShippingFee returns false when showVisibleShippingFee is false and deliveryFeeHasSucceeded is true and deliveryFeeHasFailed is false', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFeeHasSucceeded = true;
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.showShippingFee()).toBe(false);
    });
    it('showShippingFee returns false when showVisibleShippingFee is false and deliveryFeeHasSucceeded is false and deliveryFeeHasFailed is true', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFeeHasFailed = true;
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.showShippingFee()).toBe(false);
    });
    it('showShippingFee returns false when showVisibleShippingFee is false and deliveryFeeHasSucceeded is true and deliveryFeeHasFailed is true', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFeeHasSucceeded = true;
      inventoryStore.deliveryFeeHasFailed = true;
      const viewModel = new ViewModel(inventoryStore);
      expect(viewModel.showShippingFee()).toBe(false);
    });
    it('showShippingFee returns false when showVisibleShippingFee is true and deliveryFeeHasSucceeded is false and deliveryFeeHasFailed is false', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      const viewModel = new ViewModel(inventoryStore);
      viewModel.showVisibleShippingFee = true;
      expect(viewModel.showShippingFee()).toBe(false);
    });
    it('showShippingFee returns true when showVisibleShippingFee is true and deliveryFeeHasSucceeded is true and deliveryFeeHasFailed is false', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFeeHasSucceeded = true;
      const viewModel = new ViewModel(inventoryStore);
      viewModel.showVisibleShippingFee = true;
      expect(viewModel.showShippingFee()).toBe(true);
    });
    it('showShippingFee returns true when showVisibleShippingFee is true and deliveryFeeHasSucceeded is false and deliveryFeeHasFailed is true', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFeeHasFailed = true;
      const viewModel = new ViewModel(inventoryStore);
      viewModel.showVisibleShippingFee = true;
      expect(viewModel.showShippingFee()).toBe(true);
    });
    it('showShippingFee returns true when showVisibleShippingFee is true and deliveryFeeHasSucceeded is true and deliveryFeeHasFailed is true', () => {
      const invInitialState = {
        vehicle: {
          _source: {
            listingPrice: 22500,
          },
        },
      } as InventoryStoreState;
      const inventoryStore = new InventoryStore(invInitialState);
      inventoryStore.deliveryFeeHasFailed = true;
      inventoryStore.deliveryFeeHasSucceeded = true;
      const viewModel = new ViewModel(inventoryStore);
      viewModel.showVisibleShippingFee = true;
      expect(viewModel.showShippingFee()).toBe(true);
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
