import { action, makeObservable, observable } from 'mobx';

import { AsyncStatus, Store, StoreStatus } from 'src/interfaces.d';
import { Price } from 'src/networking/models/Price';
import {
  getOfferDetails,
  PriceData,
  submitPriceResponse,
} from 'src/networking/request';

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
  verificationUrl: Nullable<string>;
  vin: string;
  xkeId: number;
  year: number;
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
  verificationUrl: '',
  vin: '',
  xkeId: 0,
  year: 0,
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
      submitPriceAccept: action,
    });
    this.getOfferDetails(priceId);
  }

  getOfferDetails = (priceId: string): void => {
    getOfferDetails(priceId)
      .then((response) => {
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
          priceMapFromResponse.verificationUrl = price.verification_url;
          priceMapFromResponse.vin = price.VIN__c;
          priceMapFromResponse.xkeId = price.offer_id;
          priceMapFromResponse.year = price.Year__c;

          // This actually creates "separate" updates
          // - Price updates and refreshes views
          // - Status updates and refreshes views
          // Just a heads up this can cause race conditions
          this.price = priceMapFromResponse;
          this.storeStatus = StoreStatus.Success;
        }
      })
      .catch((error) => {
        this.storeStatus = StoreStatus.Error;
        this.asyncStatus = AsyncStatus.Idle;
        console.log(JSON.stringify(error));
      });
  };

  submitPriceAccept = async (): Promise<void> => {
    const priceData: PriceData = {
      priceId: this.price.priceId,
      accepted: true,
    };

    this.asyncStatus = AsyncStatus.Fetching;

    try {
      await submitPriceResponse(priceData);
    } catch (err) {
      console.log(JSON.stringify(err));
      return err;
    }
  };
}
