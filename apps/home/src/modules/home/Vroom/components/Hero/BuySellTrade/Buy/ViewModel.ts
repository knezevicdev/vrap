/* eslint-disable @typescript-eslint/camelcase */
import { getUrlFromFiltersData } from '@vroom-web/catalog-url-integration';
import { stringify } from 'qs';

import { BuySellTradeBuyStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

interface Link {
  label: string;
  href: string;
}

class BuyViewModel {
  private analyticsHandler: AnalyticsHandler;
  private readonly homeStore: HomeStore;
  private readonly buySellTradeBuyStore: BuySellTradeBuyStore;

  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  readonly link: Link;
  readonly resumeSearchButtonLabel: string = 'Continue Your Search';

  constructor(
    homeStore: HomeStore,
    buySellTradeBuyStore: BuySellTradeBuyStore
  ) {
    this.analyticsHandler = new AnalyticsHandler();
    this.homeStore = homeStore;
    this.buySellTradeBuyStore = buySellTradeBuyStore;

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.homeStore.query, {
      addQueryPrefix: true,
    });

    this.link = {
      href: `/cars${queryString}`,
      label: 'Browse thousands of low-mileage cars and trucks',
    };
  }

  handleMount = (): void => {
    this.buySellTradeBuyStore.initClientSide();
  };

  get showResumeSearch(): boolean {
    return !!this.buySellTradeBuyStore.filtersData;
  }

  handleResumeSearchButtonClick = (): void => {
    this.analyticsHandler.trackContinueYourSearchClicked();
    const url = getUrlFromFiltersData(this.buySellTradeBuyStore.filtersData, {
      addFiltersQueryParam: true,
    });
    const querySep = url.includes('?') ? '&' : '?';
    const query = {
      ...this.homeStore.query,
      vit_source: 'hp',
      vit_medium: 'web',
      vit_campaign: 'saved_search',
    };
    const queryString = stringify(query);
    window.location.href = `${url}${querySep}${queryString}`;
  };

  handleButtonClick = (): void => {
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.homeStore.query, {
      addQueryPrefix: true,
    });

    window.location.href = `/cars${queryString}`;
  };
}

export default BuyViewModel;
