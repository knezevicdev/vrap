import { HomeStore } from '../../store';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { showDefaultVariant } from 'src/integrations/experimentSDK';

interface Highlight {
  description: string;
  imgAlt: string;
  imgSrc: string;
  title: string;
}

class HighlightsViewModel {
  ctaLabel: string;
  readonly highlights: Highlight[] = [
    {
      description: '',
      imgAlt: 'High-Quality Cars',
      imgSrc: `${globalEnv.CDN_URL}/modules/home/images/highlight-1.png`,
      title: 'High-Quality Cars',
    },
    {
      description:
        'No haggling. No hassles. An easy and efficient car buying process— the way it should be.',
      imgAlt: 'Buying Made Easy',
      imgSrc: `${globalEnv.CDN_URL}/modules/home/images/highlight-2.png`,
      title: 'Buying Made Easy',
    },
    {
      description:
        'Get your car or truck shipped to your home or a convenient nearby\xa0location.',
      imgAlt: 'Delivered Right to You',
      imgSrc: `${globalEnv.CDN_URL}/modules/home/images/highlight-3.png`,
      title: '',
    },
  ];

  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(store: HomeStore) {
    const homeWarrantyTextExperimentVariant = showDefaultVariant(
      'snd-homepage-complimentary-limited-warranty-vs-free-limited-warranty',
      store.experiments,
      store.query
    );
    const deliveredToYouExperimentVariant = showDefaultVariant(
      'snd-homepage-delivered-right-to-you-vs-delivered-safely-to-you',
      store.experiments,
      store.query
    );
    const homeShopButtonDefaultVariant = showDefaultVariant(
      'snd-homepage-shop-now-vs-shop-vehicles',
      store.experiments,
      store.query
    );
    this.ctaLabel = `SHOP ${homeShopButtonDefaultVariant ? 'NOW' : 'VEHICLES'}`;
    this.highlights[0].description = `Multiple inspections. Free CARFAX® history report. ${
      homeWarrantyTextExperimentVariant ? 'Complimentary' : 'Free'
    } limited\xa0warranty.`;
    this.highlights[2].title = `Delivered ${
      deliveredToYouExperimentVariant ? 'Right' : 'Safely'
    } to You`;
  }

  handleButtonClick(): void {
    this.analyticsHandler.trackShowNowClicked();
    window.location.href = '/catalog';
  }
}

export default HighlightsViewModel;
