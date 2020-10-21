import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
declare class AnalyticsHandler extends BaseAnalyticsHandler {
    trackLogoClicked(): void;
    trackBuyClicked(): void;
    trackSellTradeClicked(): void;
    trackFinanceClicked(): void;
    trackLocationsClicked(): void;
    trackContactUsClicked(): void;
}
export default AnalyticsHandler;
