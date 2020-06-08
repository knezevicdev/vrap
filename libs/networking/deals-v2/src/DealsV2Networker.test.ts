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
        data: null,
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
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
        data: [
          {
            deal_id: 3500,
            account_id: 3573,
            vin: '5YJSA1H13FF089985',
            created: '2020-01-10T17:03:55.028864Z',
            updated: '2020-02-10T13:47:26.954918Z',
            summary: {
              paymentType: '',
              dealStatus: {
                status: 'Pending',
                step: 'PaymentType',
                pastSteps: ['RegistrationAddress', 'DeliveryAddress'],
                frozen: true,
                reason: '',
                errorDetail: '',
                interestedInTrade: false,
                canBeCancelled: true,
              },
              account: {
                userName: 'person-human@gmail.com',
                firstName: 'Person',
                middleName: '',
                lastName: 'Human',
                phone: '(123) 456-7890',
              },
              inventory: {
                id: '2512',
                miles: 20789,
                ownerCount: 1,
                pricing: { listPrice: 27054, msrp: 79900, blueBookValue: 0 },
                status: { key: 'for_sale', display: 'For Sale' },
                vehicle: {
                  vin: '5YJSA1H13FF089985',
                  year: 0,
                  make: 'TESLA',
                  model: 'MODEL S',
                  trim: '',
                  fuelType: { key: 'electric', display: 'Electric' },
                  seatingCapacity: 5,
                  grossWeight: 4647,
                  isElectric: true,
                  exteriorColorGeneric: { key: 'white', display: 'White' },
                  cylinders: 4,
                  engineBore: 0,
                },
                imageURLs: null,
                leadPhotoURL: '',
              },
              financing: {
                pricingStack: {
                  lenderName: '',
                  apr: 0,
                  amountFinanced: 0,
                  buyRate: 0,
                  financeCharge: 0,
                  taxItems: null,
                  termMonths: 0,
                  downPayment: 499,
                  monthlyPayment: 0,
                  totalRebates: 0,
                  totalTaxes: 0,
                  annualMileage: 0,
                  offerAvailable: false,
                },
                state: '',
                loanApplicationId: '',
                referenceId: '',
                decisions: null,
                selectedProducts: null,
              },
              amountDue: {
                taxableAmount: 0,
                cashDownPayment: 0,
                inventoryTaxRate: 0.001686,
                inventoryTaxFee: 45.613044,
                salesTaxPercentage: 0,
                salesTaxAmount: 0,
                otherStateTaxes: 0,
                totalTaxes: 0,
                titleFee: 0,
                duplicateTitleFee: 0,
                titlingCompanyFee: 0,
                licenseAndRegistrationFee: 0,
                inspectionFee: 0,
                totalStateFees: 0,
                documentationFee: 0,
                totalTaxesAndFees: 202.613044,
                shippingFee: 0,
                subTotal: 0,
                totalBalanceDue: 0,
              },
              registrationAddress: {
                id: 0,
                type: '',
                firstName: 'PERSON',
                lastName: 'HUMAN',
                streetLine1: '',
                streetLine2: '',
                city: '',
                county: '',
                state: '',
                country: '',
                postCode: '12345',
              },
              deliveryAddress: {
                id: 0,
                type: '',
                firstName: '',
                lastName: '',
                streetLine1: '',
                streetLine2: '',
                city: '',
                county: '',
                state: '',
                country: '',
                postCode: '',
              },
            },
            version_number: 0,
            attribution: {
              utm_campaign: null,
              utm_content: null,
              utm_medium: null,
              utm_source: null,
              utm_term: null,
              utm_keyword: null,
              utm_subsource: null,
            },
          },
        ],
      };
      mocked(mockAxios.get).mockImplementationOnce(() =>
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
      mocked(mockAxios.get).mockImplementationOnce(() =>
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
      mocked(mockAxios.get).mockImplementationOnce(() =>
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
