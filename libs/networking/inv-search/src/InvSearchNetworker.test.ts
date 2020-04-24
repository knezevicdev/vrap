import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import InvSearchNetworker from './InvSearchNetworker';

jest.mock('axios');

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');

// TODO add a bunch more tests to check and improve our data validation.

describe('getInventoryCount', () => {
  describe('data validation', () => {
    it('resolves data that matches the schema', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invSearchNetworker = new InvSearchNetworker('testUrl');
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
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invSearchNetworker = new InvSearchNetworker('testUrl');
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data: 42,
        })
      );
      await expect(invSearchNetworker.getInventoryCount()).rejects.toThrow();
    });

    it('rejects data that does not match the schema - 2', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invSearchNetworker = new InvSearchNetworker('testUrl');
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
