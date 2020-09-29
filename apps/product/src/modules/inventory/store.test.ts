/* eslint-disable @typescript-eslint/camelcase */
import {
  Hits,
  InventoryResponse,
  InvSearchNetworker,
  MakeCount,
  PostInventoryRequestData,
} from '@vroom-web/inv-search-networking';

import { getVehicleReponse } from './store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});
describe('Inventory Store', () => {
  const BASE_URL = '';
  describe('getVehicleReponse()', () => {
    const invSearchNetworkMock = new InvSearchNetworker(BASE_URL);
    const vin = '';
    const mockCallData: PostInventoryRequestData = {
      fulldetails: true,
      source: '',
      vin: [vin],
    };
    test('it should return a valid response if the call succeeds', async () => {
      const mockResponseData: InventoryResponse = {
        data: {
          hits: {} as Hits,
          aggregations: {
            make_count: {} as MakeCount,
          },
        },
      };

      invSearchNetworkMock.postInventory = jest
        .fn()
        .mockResolvedValue(mockResponseData);
      const apiResponse = await invSearchNetworkMock.postInventory(
        mockCallData
      );
      expect(invSearchNetworkMock.postInventory).toHaveBeenCalledTimes(1);
      expect(invSearchNetworkMock.postInventory).toHaveBeenCalledWith(
        mockCallData
      );
      getVehicleReponse(vin).then((response) => {
        expect(response).toEqual(apiResponse);
      });
    });
  });
});
