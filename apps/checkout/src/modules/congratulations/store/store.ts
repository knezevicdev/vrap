/* eslint-disable @typescript-eslint/camelcase */
import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import { action, computed, observable } from 'mobx';
import { parse, stringify } from 'qs';

class NavStore {
  private readonly catSDK: CatSDK = new CatSDK();

  @observable catData: CatData | undefined;
  @computed get phoneNumber(): string | undefined {
    if (!this.catData) {
      return undefined;
    }
    return this.catData.sitePhoneNumber;
  }

  // FIT-566
  // As a stopgap, the we persist certain query params across navigation.
  // This is so that vlassic attribution works until we build a better system.
  @observable queryString = '';

  @action
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

  @action
  setCatData = (catData: CatData): void => {
    this.catData = catData;
  };

  private catDataEventListener = (catDataEvent: CustomEvent<CatData>): void => {
    this.setCatData(catDataEvent.detail);
  };

  @action
  initClientSide = (): void => {
    this.initQueryStringClientSide();
    this.catSDK.observeCatData(this.catDataEventListener);
  };

  @action
  tearDownClientSide = (): void => {
    this.catSDK.unobserveCatData(this.catDataEventListener);
  };
}

export default NavStore;
