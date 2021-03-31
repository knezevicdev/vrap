import { ParsedUrlQuery } from 'querystring';

import StartPurchaseViewModel from './ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';
import { StartPurchaseStore } from 'src/modules/inventory/Vroom/components/StartPurchase/store';

jest.mock('src/integrations/AnalyticsHandler');
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Start Purchase View Model', () => {
  describe('getResumeStepHref', () => {
    const inventoryStore = new InventoryStore();
    const startPurchaseStore = new StartPurchaseStore('');
    const viewModel = new StartPurchaseViewModel(
      ('' as unknown) as ParsedUrlQuery,
      inventoryStore,
      startPurchaseStore
    );

    test("it should return the default if the step isn't in the dictionary", () => {
      const url = viewModel.getResumeStepHref('', 'test');
      expect(url).toEqual(`/e2e/test/my-account/transactions`);
    });

    test('it should return the correct step based on what is in the dict', () => {
      const url = viewModel.getResumeStepHref('TradeIn', 'test');
      expect(url).toEqual(`/e2e/test/checkoutTradeIn`);
    });

    test('it should return the path when selecting the trade in vehicle step', () => {
      const url = viewModel.getResumeStepHref('TradeInVehicle', '12345');
      expect(url).toEqual(`/checkout/12345/vehicleTradeIn`);
    });
  });
});
