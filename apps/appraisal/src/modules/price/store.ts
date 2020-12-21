import { action, observable } from 'mobx';

import { Price } from 'src/networking/models/Price';
import { Networker, PriceData } from 'src/networking/Networker';

export interface PriceStoreState {
  active: boolean;
  automatedAppraisal: boolean;
  created: string;
  goodUntil: string;
  make: string;
  miles: number;
  model: string;
  newOffer: boolean | null;
  price: number;
  priceId: string;
  priceStatus: string;
  taxCreditSavings: number | null;
  trim: string;
  userEmail: string;
  verificationUrl: string | null;
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

export async function submitPriceResponse(priceData: PriceData): Promise<void> {
  const networker = new Networker();
  try {
    await networker.submitPriceResponse(priceData);
    const url = `/sell/verification/owner/${priceData.priceId}`;
    window.location.href = url;
  } catch (err) {
    console.log(JSON.stringify(err));
    return err;
  }
}

export class PriceStore {
  private readonly networker = new Networker();

  @observable status: 'loading' | 'success' | 'error' = 'loading';
  @observable price: PriceStoreState = defaultPriceState;

  constructor(priceId: string) {
    this.getOfferDetails(priceId);
  }

  @action
  getOfferDetails = (priceId: string): void => {
    this.status = 'loading';

    this.networker
      .getOfferDetails(priceId)
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

          this.status = 'success';
          this.price = priceMapFromResponse;
        }
      })
      .catch((error) => {
        this.status = 'error';
        console.log(JSON.stringify(error));
      });
  };
}
