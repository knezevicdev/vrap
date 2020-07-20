import { stringify } from 'qs';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { showDefaultVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';

interface Highlight {
  description: string;
  imgAlt: string;
  imgSrc: string;
  title: string;
}

class HighlightsViewModel {
  private readonly analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly store: HomeStore;

  ctaLabel: string;
  condenseCatalogLinksDefaultVariant: boolean;
  readonly highlights: Highlight[] = [
    {
      description: '',
      imgAlt: 'High-Quality Cars',
      imgSrc: `${globalEnv.ASSET_PREFIX}/modules/home/images/highlight-1.png`,
      title: 'High-Quality Cars',
    },
    {
      description:
        'No haggling. No hassles. An easy and efficient car buying process— the way it should be.',
      imgAlt: 'Buying Made Easy',
      imgSrc: `${globalEnv.ASSET_PREFIX}/modules/home/images/highlight-2.png`,
      title: 'Buying Made Easy',
    },
    {
      description:
        'Get your car or truck shipped to your home or a convenient nearby\xa0location.',
      imgAlt: 'Delivered Right to You',
      imgSrc: `${globalEnv.ASSET_PREFIX}/modules/home/images/highlight-3.png`,
      title: '',
    },
  ];

  constructor(store: HomeStore) {
    this.store = store;

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
    this.condenseCatalogLinksDefaultVariant = showDefaultVariant(
      'snd-home-condense-catalog-links',
      store.experiments,
      store.query
    );
    const carOrTruckVsVehicleDefaultVariant = showDefaultVariant(
      'snd-car-or-truck-vs-vehicle-shipped',
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
    this.highlights[2].description = `Get your ${
      carOrTruckVsVehicleDefaultVariant ? 'car or truck' : 'vehicles'
    } shipped to your home or a convenient nearby\xa0location.`;
  }

  handleButtonClick(): void {
    this.analyticsHandler.trackShowNowClicked();
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/catalog${queryString}`;
  }
}

export default HighlightsViewModel;
