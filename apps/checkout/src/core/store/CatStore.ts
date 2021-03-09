import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { action, computed, makeObservable, observable } from 'mobx';
import { parse, stringify } from 'qs';

export interface PhoneNumberLink {
  href: string;
  name: string;
}

export class CatStore {
  catSDK: CatSDK = new CatSDK();
  catData?: CatData;
  defaultPhoneNumber: PhoneNumberLink = {
    href: 'tel:+18555241300',
    name: '(855) 524-1300',
  };
  queryString = '';

  constructor() {
    makeObservable(this, {
      catData: observable,
      initClientSide: action,
      tearDownClientSide: action,
      catDataEventListener: action,
      phoneNumber: computed,
    });
  }

  initClientSide = (): void => {
    this.initQueryStringClientSide();
    this.catSDK.observeCatData(this.catDataEventListener);
  };

  tearDownClientSide = (): void => {
    this.catSDK.unobserveCatData(this.catDataEventListener);
  };

  catDataEventListener = (catDataEvent: CustomEvent<CatData>): void => {
    this.catData = catDataEvent.detail;
  };

  get phoneNumber(): PhoneNumberLink {
    if (!this.catData) {
      return this.defaultPhoneNumber;
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(
      decodeURIComponent(this.catData.sitePhoneNumber),
      'US'
    );

    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      return this.defaultPhoneNumber;
    }

    return {
      href: parsedPhoneNumber.getURI(),
      name: parsedPhoneNumber.formatNational(),
    };
  }

  // FIT-566
  // As a stopgap, the we persist certain query params across navigation.
  // This is so that vlassic attribution works until we build a better system.
  private initQueryStringClientSide = (): void => {
    const query = parse(window.location.search, { ignoreQueryPrefix: true });
    /* eslint-disable @typescript-eslint/camelcase */
    const picked = (({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    }): any => ({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    }))(query);
    this.queryString = stringify(picked, { addQueryPrefix: true });
  };
}
