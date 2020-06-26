import { HomeStore } from '../../store';

import { showDefaultVariant } from 'src/integrations/experimentSDK';

class QuoteHIWModel {
  quoteHIWPositionDefaultVariant: boolean;
  constructor(store: HomeStore) {
    this.quoteHIWPositionDefaultVariant = showDefaultVariant(
      'snd-homepage-hiw-above-and-below-user-quotes',
      store.experiments,
      store.query
    );
  }
}

export default QuoteHIWModel;
