import { HomeStore } from '../../store';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { getExperimentVariant } from 'src/integrations/experimentSDK';

interface Highlight {
  description: string;
  imgAlt: string;
  imgSrc: string;
  title: string;
}

class HighlightsViewModel {
  readonly ctaLabel: string = 'SHOP NOW';
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
      title: 'Delivered Right to You',
    },
  ];

  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(store: HomeStore) {
    const homeWarrantyTextExperimentVariant = getExperimentVariant(
      'snd-homepage-complimentary-limited-warranty-vs-free-limited-warranty',
      store.experiments,
      store.query
    );
    const highQualityCarHighlight = this.highlights.find(
      (highlight) => highlight.title === 'High-Quality Cars'
    );
    if (highQualityCarHighlight) {
      highQualityCarHighlight.description = `Multiple inspections. Free CARFAX® history report. ${
        homeWarrantyTextExperimentVariant ? 'Complimentary' : 'Free'
      } limited\xa0warranty.`;
    }
  }

  handleButtonClick(): void {
    this.analyticsHandler.trackShowNowClicked();
    window.location.href = '/catalog';
  }
}

export default HighlightsViewModel;
