import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
declare class AnalyticsHandler extends BaseAnalyticsHandler {
    trackBuyClicked(): void;
    trackHomeClicked(): void;
    trackSellTradeClicked(): void;
    trackFinanceClicked(): void;
    trackAboutUsClicked(): void;
    trackVroomProtectionClicked(): void;
    trackHowItWorksClicked(): void;
    trackCustomerReviewsClicked(): void;
    trackInvestorRelationsClicked(): void;
    trackFAQClicked(): void;
    trackPhoneClicked(): void;
    trackContactUsClicked(): void;
    trackLoginClicked(): void;
    trackProfileClicked(): void;
    trackFavoritesClicked(): void;
    trackTransactionsClicked(): void;
    trackAddressesClicked(): void;
    trackTransactionResumeClicked(): void;
    trackSignOutClicked(): void;
    trackFavoritesHeartClicked(): void;
}
export default AnalyticsHandler;
