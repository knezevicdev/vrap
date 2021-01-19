import { AnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

class HeroViewModel {
  isVariant: boolean;

  constructor(isVariant?: boolean) {
    this.isVariant = isVariant || false;
  }

  readonly picture = {
    alt: 'Jeep',
    src: `${BASE_PATH}/images/Hero-Jeep-image.png`,
    width: 'auto',
    aspectRatio: '960:720',
  };
  readonly title = 'Jeep Wrangler';

  readonly button = `FIND YOURS`;
  readonly logoHref = '/';
  readonly analyticsHandler = new AnalyticsHandler();

  onClick = (): void => {
    this.analyticsHandler.track('Find Yours Clicked', {
      description: 'A user clicked Find Yours In the Main Navigation',
      category: 'Main Navigation',
    });
    window.location.href = 'https://www.vroom.com/cars/jeep/wrangler';
  };
}

export default HeroViewModel;
