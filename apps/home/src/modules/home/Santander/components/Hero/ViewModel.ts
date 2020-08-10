import SantanderAnalyticsHandler from 'src/integrations/SantanderAnalyticsHandler';

interface Link {
  label: string;
  href: string;
  handleAnalytics: () => void;
}

class ViewModel {
  private readonly analyticsHandler: SantanderAnalyticsHandler = new SantanderAnalyticsHandler();
  readonly title: string = 'Great cars.\nDelivered to you.';
  readonly browseLink: Link = {
    label: 'Browse all low-mileage cars and trucks',
    href: '/cars',
    handleAnalytics: this.analyticsHandler.trackBrowseAll,
  };
}

export default ViewModel;
