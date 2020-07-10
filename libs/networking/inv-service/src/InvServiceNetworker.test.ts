/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import InvServiceNetworker from './InvServiceNetworker';

jest.mock('axios');

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');

const mockUrl = 'mock-url';

describe('getVehicleAvailability', () => {
  describe('data validation', () => {
    it('returns true if single array with for_sale', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invServiceNetworker = new InvServiceNetworker(mockUrl);
      const data = {
        data: {
          payload: [
            {
              id: 10312287,
              created: '2020-06-30T14:26:47.933703Z',
              updated: '2020-06-30T14:26:59.761477Z',
              vehicleVin: '1GT422C8XFF560039',
              status: {
                key: 'for_sale',
                display: 'For Sale',
              },
              miles: 43397,
              purchasingID: 323,
              pricingID: null,
              fyusionID: 'urfb4sx2maq5g',
              externalID: '8a2f55d8-46ad-4c37-8d5a-4933469e13ff',
              consignmentPartnerName: null,
              isListed: false,
              grade: null,
            },
          ],
          next_page: null,
        },
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(
        invServiceNetworker.getInventoryAvailability('1GT422C8XFF560039')
      ).resolves.toEqual(true);
    });
    it('returns false if single array without for_sale', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invServiceNetworker = new InvServiceNetworker(mockUrl);
      const data = {
        data: {
          payload: [
            {
              id: 10312287,
              created: '2020-06-30T14:26:47.933703Z',
              updated: '2020-06-30T14:26:59.761477Z',
              vehicleVin: '1GT422C8XFF560039',
              status: {
                key: 'sales_pending',
                display: 'Sales Pending',
              },
              miles: 43397,
              purchasingID: 323,
              pricingID: null,
              fyusionID: 'urfb4sx2maq5g',
              externalID: '8a2f55d8-46ad-4c37-8d5a-4933469e13ff',
              consignmentPartnerName: null,
              isListed: false,
              grade: null,
            },
          ],
          next_page: null,
        },
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(
        invServiceNetworker.getInventoryAvailability('1GT422C8XFF560039')
      ).resolves.toEqual(false);
    });
    it('returns true if multiple array with a for_sale', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invServiceNetworker = new InvServiceNetworker(mockUrl);
      const data = {
        data: {
          payload: [
            {
              id: 10312287,
              created: '2020-06-30T14:26:47.933703Z',
              updated: '2020-06-30T14:26:59.761477Z',
              vehicleVin: '1GT422C8XFF560039',
              status: {
                key: 'sold',
                display: 'Sold',
              },
              miles: 43397,
              purchasingID: 323,
              pricingID: null,
              fyusionID: 'urfb4sx2maq5g',
              externalID: '8a2f55d8-46ad-4c37-8d5a-4933469e13ff',
              consignmentPartnerName: null,
              isListed: false,
              grade: null,
            },
            {
              id: 10312287,
              created: '2020-06-30T14:26:47.933703Z',
              updated: '2020-06-30T14:26:59.761477Z',
              vehicleVin: '1GT422C8XFF560039',
              status: {
                key: 'for_sale',
                display: 'For Sale',
              },
              miles: 43397,
              purchasingID: 323,
              pricingID: null,
              fyusionID: 'urfb4sx2maq5g',
              externalID: '8a2f55d8-46ad-4c37-8d5a-4933469e13ff',
              consignmentPartnerName: null,
              isListed: false,
              grade: null,
            },
          ],
          next_page: null,
        },
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(
        invServiceNetworker.getInventoryAvailability('1GT422C8XFF560039')
      ).resolves.toEqual(true);
    });
    it('returns false if multiple array without a for_sale', async () => {
      mocked(axios.create).mockImplementationOnce(() => mockAxios);
      const invServiceNetworker = new InvServiceNetworker(mockUrl);
      const data = {
        data: {
          payload: [
            {
              id: 10312287,
              created: '2020-06-30T14:26:47.933703Z',
              updated: '2020-06-30T14:26:59.761477Z',
              vehicleVin: '1GT422C8XFF560039',
              status: {
                key: 'sales_pending',
                display: 'Sales Pending',
              },
              miles: 43397,
              purchasingID: 323,
              pricingID: null,
              fyusionID: 'urfb4sx2maq5g',
              externalID: '8a2f55d8-46ad-4c37-8d5a-4933469e13ff',
              consignmentPartnerName: null,
              isListed: false,
              grade: null,
            },
            {
              id: 10312287,
              created: '2020-06-30T14:26:47.933703Z',
              updated: '2020-06-30T14:26:59.761477Z',
              vehicleVin: '1GT422C8XFF560039',
              status: {
                key: 'sold',
                display: 'Sold',
              },
              miles: 43397,
              purchasingID: 323,
              pricingID: null,
              fyusionID: 'urfb4sx2maq5g',
              externalID: '8a2f55d8-46ad-4c37-8d5a-4933469e13ff',
              consignmentPartnerName: null,
              isListed: false,
              grade: null,
            },
          ],
          next_page: null,
        },
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );
      await expect(
        invServiceNetworker.getInventoryAvailability('1GT422C8XFF560039')
      ).resolves.toEqual(false);
    });
  });
});
