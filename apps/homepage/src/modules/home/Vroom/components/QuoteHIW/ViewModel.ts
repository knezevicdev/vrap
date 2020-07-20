import { showDefaultVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';

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
