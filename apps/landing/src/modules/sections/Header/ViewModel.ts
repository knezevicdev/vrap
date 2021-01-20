import { AnalyticsHandler } from '@vroom-web/analytics-integration';

class HeaderViewModel {
  isVariant: boolean;

  constructor(isVariant?: boolean) {
    this.isVariant = isVariant || false;
  }

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

export default HeaderViewModel;
