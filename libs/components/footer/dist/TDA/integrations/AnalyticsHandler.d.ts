import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
declare class AnalyticsHandler extends BaseAnalyticsHandler {
    private getPageName;
    trackLinkClicked: (label: string) => () => void;
}
export default AnalyticsHandler;
