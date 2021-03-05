/* eslint-disable @typescript-eslint/camelcase */
import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import { action, makeObservable, observable } from 'mobx';
import { parse, stringify } from 'qs';

class FooterStore {
  private readonly catSDK: CatSDK = new CatSDK();

  catData: CatData | undefined;
  get phoneNumber(): string | undefined {
    if (!this.catData) {
      return undefined;
    }
    return this.catData.sitePhoneNumber;
  }

  constructor() {
    makeObservable(this, {
      catData: observable,
      setCatData: action,
      initClientSide: action,
      tearDownClientSide: action,
    });
  }

  // FIT-566
  // As a stopgap, the we persist certain query params across navigation.
  // This is so that vlassic attribution works until we build a better system.
  queryString = '';

  private initQueryStringClientSide = (): void => {
    const query = parse(window.location.search, { ignoreQueryPrefix: true });
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  setCatData = (catData: CatData): void => {
    this.catData = catData;
  };

  private catDataEventListener = (catDataEvent: CustomEvent<CatData>): void => {
    this.setCatData(catDataEvent.detail);
  };

  initClientSide = (): void => {
    this.initQueryStringClientSide();
    this.catSDK.observeCatData(this.catDataEventListener);
  };

  tearDownClientSide = (): void => {
    this.catSDK.unobserveCatData(this.catDataEventListener);
  };
}

export default FooterStore;
