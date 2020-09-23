/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import InvSearchNetworker from './InvSearchNetworker';

jest.mock('axios');

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');

// TODO add a bunch more tests to check and improve our data validation.

describe('getInventoryCount', () => {
  describe('data validation', () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const invSearchNetworker = new InvSearchNetworker('testUrl');
    it('resolves data that matches the schema', async () => {
      const data = {
        data: 42,
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(invSearchNetworker.getInventoryCount()).resolves.toEqual(
        data
      );
    });

    it('rejects data that does not match the schema - 1', async () => {
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data: 42,
        })
      );
      await expect(invSearchNetworker.getInventoryCount()).rejects.toThrow();
    });

    it('rejects data that does not match the schema - 2', async () => {
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: '42',
          },
        })
      );
      await expect(invSearchNetworker.getInventoryCount()).rejects.toThrow();
    });
  });
});

describe('getInventorySimilar', () => {
  mocked(axios.create).mockImplementationOnce(() => mockAxios);
  const invSearchNetworker = new InvSearchNetworker('testUrl');
  describe('data validation', () => {
    it('rejects data that does not match the schema - 1', async () => {
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            timed_out: false,
            hits: { total: 0, hits: null },
            aggregations: {
              make_count: { buckets: null },
              makeKey_count: { buckets: null },
              transId_count: { buckets: null },
              drivetrain_count: { buckets: null },
              bodyType_count: { buckets: null },
            },
          },
        })
      );
      const mockData = {
        min: 1,
        vin: '',
        useVinCluster: true,
      };
      await expect(
        invSearchNetworker.getInventorySimilar(mockData)
      ).rejects.toThrow();
    });
  });
});
