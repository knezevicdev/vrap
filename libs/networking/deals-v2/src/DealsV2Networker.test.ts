/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import DealsV2Networker from './DealsV2Networker';

jest.mock('axios');

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');

const mockUrl = 'mock-url';

const mockAccessToken = 'mock-access-token';

// TODO add a bunch more tests to check and improve our data validation.

describe('getMyDeals', () => {
  describe('data validation', () => {
    it('resolves data that matches the schema - 1', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const dealsV2Networker = new DealsV2Networker(mockUrl);
      const data = {
        data: {
          user: {
            deals: [],
          },
        },
      };
      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(
        dealsV2Networker.getMyDeals(mockAccessToken)
      ).resolves.toEqual(data);
    });

    it('resolves data that matches the schema - 2', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const dealsV2Networker = new DealsV2Networker(mockUrl);
      const data = {
        data: {
          user: {
            deals: [
              {
                dealSummary: {
                  dealStatus: {
                    status: 'Pending',
                    step: 'PaymentType',
                  },
                  inventory: {
                    pricing: {
                      listPrice: 40998,
                    },
                    vehicle: {
                      make: 'Lexus',
                      model: 'ES',
                      trim: '',
                      vin: '5YJSA1H13FF089985',
                      year: 2012,
                    },
                  },
                },
              },
              {
                dealSummary: {
                  dealStatus: {
                    status: 'Pending',
                    step: 'DealSummary',
                  },
                  inventory: {
                    pricing: {
                      listPrice: 40998,
                    },
                    vehicle: {
                      make: 'Lexus',
                      model: 'ES',
                      trim: '',
                      vin: '5YJSA1H13FF089985',
                      year: 2012,
                    },
                  },
                },
              },
            ],
          },
        },
      };
      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(
        dealsV2Networker.getMyDeals(mockAccessToken)
      ).resolves.toEqual(data);
    });

    it('rejects data that does not match the schema - 1', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const dealsV2Networker = new DealsV2Networker(mockUrl);
      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data: 42,
        })
      );
      await expect(
        dealsV2Networker.getMyDeals(mockAccessToken)
      ).rejects.toThrow();
    });

    it('rejects data that does not match the schema - 2', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const dealsV2Networker = new DealsV2Networker(mockUrl);
      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: '42',
          },
        })
      );
      await expect(
        dealsV2Networker.getMyDeals(mockAccessToken)
      ).rejects.toThrow();
    });
  });
});
