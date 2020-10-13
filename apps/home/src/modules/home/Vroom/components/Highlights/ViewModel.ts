import getConfig from 'next/config';
import { stringify } from 'qs';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

const { publicRuntimeConfig } = getConfig();

interface Highlight {
  description: string;
  imgAlt: string;
  imgSrc: string;
  title: string;
}

class HighlightsViewModel {
  private readonly analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly store: HomeStore;

  ctaLabel = 'SHOP VEHICLES';
  readonly highlights: Highlight[] = [
    {
      description: `Multiple inspections. Free CARFAX® history report. Free limited\xa0warranty.`,
      imgAlt: 'High-Quality Cars',
      imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/highlight-1.png`,
      title: 'High-Quality Cars',
    },
    {
      description:
        'No haggling. No hassles. An easy and efficient car buying process— the way it should be.',
      imgAlt: 'Buying Made Easy',
      imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/highlight-2.png`,
      title: 'Buying Made Easy',
    },
    {
      description:
        'Get your car or truck shipped to your home or a convenient nearby\xa0location.',
      imgAlt: 'Delivered Right to You',
      imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/highlight-3.png`,
      title: 'Delivered Right to You',
    },
  ];

  constructor(store: HomeStore) {
    this.store = store;
  }

  handleButtonClick(): void {
    this.analyticsHandler.trackShowNowClicked();
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/cars${queryString}`;
  }
}

export default HighlightsViewModel;
