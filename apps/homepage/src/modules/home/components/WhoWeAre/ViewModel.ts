import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class WhoWeAreViewModel {
  readonly title: string = 'who we are';
  readonly subtitle: string =
    'Our hundreds of team members are helping Vroom revolutionize the way people buy, sell, and trade in cars. Count on us to make your next car buying experience the best you’ve ever had.';
  readonly button: string = 'LEARN MORE';

  private analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  learnMoreClicked(): void {
    this.analyticsHandler.trackWhoWeAreLearnMoreClicked();
    window.location.href = '/about';
  }
}

export default WhoWeAreViewModel;
