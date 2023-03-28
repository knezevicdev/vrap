import { AnalyticsHandler } from '@vroom-web/analytics-integration';

const trackLogin = (email: string, userId: string) => {
  const analyticsHandler = new AnalyticsHandler();

  analyticsHandler.identify({ email }, userId);
  analyticsHandler.track('Login', {
    category: 'Account Management',
  });
};

export default trackLogin;
