import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
declare class AnalyticsHandler extends BaseAnalyticsHandler {
    trackShopNow: () => void;
    trackLogo: () => void;
    trackFinanceCalculator: () => void;
    trackContact: () => void;
    trackCorporateSite: () => void;
    trackLearningOverview: () => void;
    trackLearningBlog: () => void;
    trackLearningServicemembers: () => void;
}
export default AnalyticsHandler;
