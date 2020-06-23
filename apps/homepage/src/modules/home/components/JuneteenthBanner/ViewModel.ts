import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class JuneteenthBannerViewModel {
  readonly bannerText: string =
    'Vroom is proud to acknowledge, celebrate and bring awareness to\xa0Juneteenth.';
  readonly buttonText: string = 'WHAT IS JUNETEENTH?';

  private analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  // Only show this banner if today is June 19.
  show(): boolean {
    const today = new Date();
    const isJune = today.getMonth() === 5; // months start at 0.
    const isThe19th = today.getDate() === 19;
    return isJune && isThe19th;
  }

  handleClickButton(): void {
    this.analyticsHandler.trackWhatIsJuneteenthClicked();
    window.location.href =
      'https://nmaahc.si.edu/blog-post/historical-legacy-juneteenth';
  }
}

export default JuneteenthBannerViewModel;
