import { isErrorResponse } from '@vroom-web/networking';
import { action, makeObservable, observable } from 'mobx';

import { AsyncStatus, Store, StoreStatus } from 'src/interfaces.d';
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
};

export class PriceStore implements Store {
  price = defaultPriceState;
  storeStatus = StoreStatus.Initial;
  asyncStatus = AsyncStatus.Idle;

  constructor(priceId: string) {
    makeObservable(this, {
      price: observable,
      storeStatus: observable,
      asyncStatus: observable,
      getOfferDetails: action,
    });
    this.getOfferDetails(priceId);
  }

  getOfferDetails = async (priceId: string): Promise<void> => {
    const response = await getOfferDetails(priceId);

    if (isErrorResponse(response)) {
      this.storeStatus = StoreStatus.Error;
      this.asyncStatus = AsyncStatus.Idle;
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

        // This actually creates "separate" updates
        // - Price updates and refreshes views
        // - Status updates and refreshes views
        // Just a heads up this can cause race conditions
        this.price = priceMapFromResponse;
        this.storeStatus = StoreStatus.Success;
      } else {
        const priceMapFromResponse = {} as PriceStoreState;
        priceMapFromResponse.automatedAppraisal = false;

        this.price = priceMapFromResponse;
        this.storeStatus = StoreStatus.Success;
      }
    }
  };
}
