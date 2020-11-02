import { action, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import { Prices } from 'src/networking/models/Price';
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

export async function submitPriceResponse(priceData: PriceData): Promise<void> {
  const networker = new Networker();
  try {
    await networker.submitPriceResponse(priceData);
    const url = `/sell/verification/owner/${priceData.priceId}`;
    window.location.href = url;
  } catch (err) {
    console.log({ err });
    return err;
  }
}

async function getInitialPriceStoreState(
  priceId: string
): Promise<PriceStoreState> {
  const networker = new Networker();
  try {
    const response = await networker.getOfferDetails(priceId);
    const prices: Prices = response.data;
    const price = prices.data[0];

    const priceState = {} as PriceStoreState;
    priceState.active = price.active;
    priceState.automatedAppraisal = price.automated_appraisal;
    priceState.created = price.created;
    priceState.goodUntil = price.Good_Until__c;
    priceState.make = price.Make__c;
    priceState.miles = price.miles;
    priceState.model = price.Model__c;
    priceState.newOffer = price.new_offer;
    priceState.price = price.Price__c;
    priceState.priceId = price.ID;
    priceState.priceStatus = price.offer_status;
    priceState.taxCreditSavings = price.tax_credit_savings;
    priceState.trim = price.Trim__c;
    priceState.userEmail = price.user_email;
    priceState.verificationUrl = price.verification_url;
    priceState.vin = price.VIN__c;
    priceState.xkeId = price.offer_id;
    priceState.year = price.Year__c;
    return priceState;
  } catch (err) {
    const errorState = {} as PriceStoreState;
    errorState.active = false;
    errorState.automatedAppraisal = false;
    errorState.created = '';
    errorState.goodUntil = '2020-01-01T00:00:00Z';
    errorState.make = '';
    errorState.miles = 0;
    errorState.model = '';
    errorState.newOffer = null;
    errorState.price = 0;
    errorState.priceId = '';
    errorState.priceStatus = '';
    errorState.taxCreditSavings = null;
    errorState.trim = '';
    errorState.userEmail = '';
    errorState.verificationUrl = '';
    errorState.vin = '';
    errorState.xkeId = 0;
    errorState.year = 0;
    return errorState;
  }
}

export class PriceStore {
  @observable automatedAppraisal = false;
  @observable price = 0;
  @observable priceId = '';
  @observable goodUntil = '2020-01-01T00:00:00Z';
  @observable active = false;
  @observable created = '';
  @observable make = '';
  @observable miles = 0;
  @observable model = '';
  @observable newOffer = null;
  @observable priceStatus = '';
  @observable taxCreditSavings = null;
  @observable trim = '';
  @observable userEmail = '';
  @observable verificationUrl = '';
  @observable vin = '';
  @observable xkeId = 0;
  @observable year = 0;

  constructor(priceId: string) {
    this.init(priceId);
  }

  @action
  async init(priceId: string): Promise<PriceStoreState> {
    const initialState = await getInitialPriceStoreState(priceId);
    runInAction(() => {
      this.automatedAppraisal = initialState.automatedAppraisal;
      this.price = initialState.price;
      this.priceId = initialState.priceId;
      this.goodUntil = initialState.goodUntil;
      this.active = initialState.active;
      this.created = initialState.created;
      this.make = initialState.make;
      this.miles = initialState.miles;
      this.model = initialState.model;
      this.newOffer = initialState.newOffer;
      this.priceStatus = initialState.priceStatus;
      this.taxCreditSavings = initialState.taxCreditSavings;
      this.trim = initialState.trim;
      this.userEmail = initialState.userEmail;
      this.verificationUrl = initialState.verificationUrl;
      this.vin = initialState.vin;
      this.xkeId = initialState.xkeId;
      this.year = initialState.year;
    });
  }
}

export const PriceStoreContext = createContext();

export const usePriceStore = (): PriceStore => {
  const store = useContext(PriceStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
