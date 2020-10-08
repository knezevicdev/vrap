import { observable } from 'mobx';
import { createContext, useContext } from 'react';

import { PriceStatus } from './ViewModel';

import { Prices } from 'src/networking/models/Price';
import { Networker } from 'src/networking/Networker';

export interface PriceStoreState {
  active: boolean | null;
  automatedAppraisal: boolean | null;
  created: string | null;
  goodUntil: string | null;
  make: string | null;
  miles: number | null;
  model: string | null;
  newOffer: null | null;
  xkeId: number | null;
  price: number | null;
  priceId: string | null;
  priceStatus: PriceStatus | null;
  taxCreditSavings: string | null;
  trim: string | null;
  userEmail: string | null;
  verificationUrl: string | null;
  vin: string | null;
  year: number | null;
}

export async function getInitialPriceStoreState(
  priceId: string
): Promise<PriceStoreState> {
  const initialState: PriceStoreState = {
    active: null,
    automatedAppraisal: null,
    created: null,
    goodUntil: null,
    make: null,
    miles: null,
    model: null,
    newOffer: null,
    price: null,
    priceId: null,
    priceStatus: null,
    taxCreditSavings: null,
    trim: null,
    userEmail: null,
    verificationUrl: null,
    vin: null,
    xkeId: null,
    year: null,
  };

  const networker = new Networker();
  try {
    const response = await networker.getOfferDetails(priceId);
    const prices: Prices = response.data;
    const price = prices.data[0];

    const priceState = {};
    priceState.active = price.active;
    priceState.automatedAppraisal = price.automated_appraisal;
    priceState.created = price.Good_Until__c;
    priceState.goodUntil = price.created;
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
    return initialState;
  }
}

export class PriceStore {
  @observable priceStatus = PriceStatus.INITIAL;
  @observable price = 0;

  constructor(initialState?: PriceStoreState) {
    if (initialState) {
      this.priceStatus = initialState.priceStatus;
      this.price = initialState.price;
    }
  }
}

export const PriceStoreContext = createContext<PriceStore>(new PriceStore());

export const usePriceStore = (): PriceStoreState => {
  const store = useContext(PriceStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
