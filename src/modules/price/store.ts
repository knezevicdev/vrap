import { isErrorResponse } from '@vroom-web/networking';
import { create } from 'zustand';

import { AsyncStatus, StoreStatus } from 'src/interfaces.d';
import { Price } from 'src/networking/models/Price';
import { getOfferDetails } from 'src/networking/request';

type Nullable<T> = T | null;

export interface PriceStoreState {
  active: boolean;
  automatedAppraisal: boolean;
  created: string;
  goodUntil: string;
  make: string;
  miles: number;
  model: string;
  newOffer: Nullable<boolean>;
  price: number;
  priceId: string;
  priceStatus: string;
  taxCreditSavings: Nullable<number>;
  trim: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  verificationUrl: Nullable<string>;
  vin: string;
  xkeId: number;
  year: number;
  zipcode: string;
  grade: string;
  priceReductionReasons: {
    branded_title_history: boolean;
    clean_vehicle_history: boolean;
    damage_history_found: boolean;
    out_of_speciality: boolean;
  } | null;
}

export const defaultPriceState: PriceStoreState = {
  active: false,
  automatedAppraisal: false,
  created: '',
  goodUntil: '2020-01-01T00:00:00Z',
  make: '',
  miles: 0,
  model: '',
  newOffer: null,
  price: 0,
  priceId: '',
  priceStatus: '',
  taxCreditSavings: null,
  trim: '',
  userEmail: '',
  userFirstName: '',
  userLastName: '',
  userPhone: '',
  verificationUrl: '',
  vin: '',
  xkeId: 0,
  year: 0,
  zipcode: '',
  grade: '',
  priceReductionReasons: null,
};

export type PriceState = {
  price: PriceStoreState;
  storeStatus: StoreStatus;
  asyncStatus: AsyncStatus;
  getOfferDetails(priceId: string): Promise<void>;
};

const usePriceStore = create<PriceState>()((set) => ({
  price: defaultPriceState,
  storeStatus: StoreStatus.Initial,
  asyncStatus: AsyncStatus.Idle,
  getOfferDetails: async (priceId: string): Promise<void> => {
    const response = await getOfferDetails(priceId);

    if (isErrorResponse(response)) {
      set({
        storeStatus: StoreStatus.Error,
        asyncStatus: AsyncStatus.Idle,
      });
      console.log(JSON.stringify(Error));
    } else {
      const prices: Price[] = response.data.data;
      if (prices.length) {
        const price = prices[0];
        const priceMapFromResponse = {} as PriceStoreState;
        priceMapFromResponse.active = price.active;
        priceMapFromResponse.automatedAppraisal = price.automated_appraisal;
        priceMapFromResponse.created = price.created;
        priceMapFromResponse.goodUntil = price.Good_Until__c;
        priceMapFromResponse.make = price.Make__c;
        priceMapFromResponse.miles = price.miles;
        priceMapFromResponse.model = price.Model__c;
        priceMapFromResponse.newOffer = price.new_offer;
        priceMapFromResponse.price = price.Price__c;
        priceMapFromResponse.priceId = price.ID;
        priceMapFromResponse.priceStatus = price.offer_status;
        priceMapFromResponse.taxCreditSavings = price.tax_credit_savings;
        priceMapFromResponse.trim = price.Trim__c;
        priceMapFromResponse.userEmail = price.user_email;
        priceMapFromResponse.userFirstName = price.first_name;
        priceMapFromResponse.userLastName = price.last_name;
        priceMapFromResponse.userPhone = price.phone;
        priceMapFromResponse.verificationUrl = price.verification_url;
        priceMapFromResponse.vin = price.VIN__c;
        priceMapFromResponse.xkeId = price.offer_id;
        priceMapFromResponse.year = price.Year__c;
        priceMapFromResponse.zipcode = price.zipcode;
        priceMapFromResponse.grade = price.grade;
        priceMapFromResponse.priceReductionReasons =
          price.price_reduction_reasons;

        // This actually creates "separate" updates
        // - Price updates and refreshes views
        // - Status updates and refreshes views
        // Just a heads up this can cause race conditions
        set({
          price: priceMapFromResponse,
          storeStatus: StoreStatus.Success,
        });
      } else {
        const priceMapFromResponse = {} as PriceStoreState;
        priceMapFromResponse.automatedAppraisal = false;

        set({
          price: priceMapFromResponse,
          storeStatus: StoreStatus.Success,
        });
      }
    }
  },
}));

export default usePriceStore;
