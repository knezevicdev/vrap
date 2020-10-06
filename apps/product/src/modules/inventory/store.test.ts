/* eslint-disable @typescript-eslint/camelcase */
import {
  Hit,
  Hits,
  InventoryResponse,
  InvSearchNetworker,
  MakeCount,
} from '@vroom-web/inv-search-networking';
import { InvServiceNetworker } from '@vroom-web/inv-service-networking';

import {
  getInventoryAvailabilityState,
  getVehicleResponse,
  getVehicleSimilarState,
  getVehicleState,
} from './store';

import { Status } from 'src/networking/types';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Inventory Store', () => {
  const BASE_URL = '';
  const vin = '';
  describe('getVehicleResponse()', () => {
    const invSearchNetworkMock = new InvSearchNetworker(BASE_URL);

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

      const response = await getVehicleResponse(vin, invSearchNetworkMock);
      expect(invSearchNetworkMock.postInventory).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockResponseData);
    });

    test('it should return undefined if the call errors', async () => {
      invSearchNetworkMock.postInventory = jest
        .fn()
        .mockRejectedValue(new Error('test'));

      const response = await getVehicleResponse(vin, invSearchNetworkMock);
      expect(invSearchNetworkMock.postInventory).toHaveBeenCalledTimes(1);
      expect(response).toEqual(undefined);
    });
  });

  describe('getVehicleState()', () => {
    const mockVehicleResponse = ({
      data: {
        hits: {
          hits: [
            {
              _source: {
                vin: '1',
              },
            },
          ],
        },
      },
    } as unknown) as InventoryResponse;
    const mockErrorState = {
      vehicleStatus: Status.ERROR,
    };
    const mockVehicle = ({
      _source: {
        vin: '1',
      },
    } as unknown) as Hit;

    const invSearchNetworker = ({} as unknown) as InvSearchNetworker;

    test('it should return the vehicle and set the status as success', async () => {
      const mockSuccessState = {
        vehicleStatus: Status.SUCCESS,
        vehicle: mockVehicle,
      };

      const getVehicleReponseMock = jest
        .fn()
        .mockResolvedValue(mockVehicleResponse);

      const response = await getVehicleState(
        '1',
        getVehicleReponseMock,
        invSearchNetworker
      );
      expect(getVehicleReponseMock).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockSuccessState);
    });

    test('it should set the status as error if it the API errors', async () => {
      const getVehicleReponseMock = jest.fn().mockResolvedValue(undefined);
      const response = await getVehicleState(
        '1',
        getVehicleReponseMock,
        invSearchNetworker
      );
      expect(getVehicleReponseMock).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockErrorState);
    });

    test('it should set the status as error if it cannot find the exact vin', async () => {
      const getVehicleReponseMock = jest
        .fn()
        .mockResolvedValue(mockVehicleResponse);

      const response = await getVehicleState(
        '2',
        getVehicleReponseMock,
        invSearchNetworker
      );
      expect(getVehicleReponseMock).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockErrorState);
    });
  });

  describe('getVehicleSimilarState()', () => {
    const invSearchNetworkMock = new InvSearchNetworker(BASE_URL);

    test('it should return the hits and set the status to success if the call succeeds', async () => {
      const mockVehicleResponse = ({
        data: {
          hits: {
            hits: [
              {
                _source: {
                  vin: '1',
                },
              },
            ],
          },
        },
      } as unknown) as InventoryResponse;

      const mockResponseData = {
        similarStatus: Status.SUCCESS,
        similar: [
          {
            _source: {
              vin: '1',
            },
          },
        ],
      };

      invSearchNetworkMock.getInventorySimilar = jest
        .fn()
        .mockResolvedValue(mockVehicleResponse);

      const response = await getVehicleSimilarState(
        vin,
        true,
        invSearchNetworkMock
      );
      expect(invSearchNetworkMock.getInventorySimilar).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockResponseData);
    });

    test('it should set the status to error if the call fails', async () => {
      const mockResponseData = {
        similarStatus: Status.ERROR,
      };

      invSearchNetworkMock.getInventorySimilar = jest
        .fn()
        .mockRejectedValue(new Error('test'));

      const response = await getVehicleSimilarState(
        vin,
        true,
        invSearchNetworkMock
      );
      expect(invSearchNetworkMock.getInventorySimilar).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockResponseData);
    });
  });

  describe('getInventoryAvailabilityState()', () => {
    const invServiceNetworkerMock = new InvServiceNetworker(BASE_URL);

    test('it should return the response if the API call resolves', async () => {
      invServiceNetworkerMock.getInventoryAvailability = jest
        .fn()
        .mockResolvedValue(true);

      const response = await getInventoryAvailabilityState(
        vin,
        invServiceNetworkerMock
      );
      expect(
        invServiceNetworkerMock.getInventoryAvailability
      ).toHaveBeenCalledTimes(1);
      expect(response).toEqual(true);
    });

    test('it should return false if the API call fails', async () => {
      invServiceNetworkerMock.getInventoryAvailability = jest
        .fn()
        .mockRejectedValue(new Error('test'));

      const response = await getInventoryAvailabilityState(
        vin,
        invServiceNetworkerMock
      );
      expect(
        invServiceNetworkerMock.getInventoryAvailability
      ).toHaveBeenCalledTimes(1);
      expect(response).toEqual(false);
    });
  });
});
