import getConfig from 'next/config';

import { ContextState, Summary } from '../../ReviewsContext';

const { publicRuntimeConfig } = getConfig();

class HeroViewModel {
  readonly tagline = `VROOM REVIEWS`;
  readonly ratingBoxTitle = `Average Review Rating`;
  readonly title = `SEE WHAT OUR
  CUSTOMERS
  ARE SAYING`;
  readonly subtitle = `Don't just take our word for it.`;
  car = {
    src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/reviews/reviews_bmw.png`,
    alt: 'How it works car',
  };

  private summary: Summary | null;

  constructor(store: ContextState) {
    this.summary = store.summary;
  }

  getSummary = (): Summary | null => this.summary;
}

export default HeroViewModel;
