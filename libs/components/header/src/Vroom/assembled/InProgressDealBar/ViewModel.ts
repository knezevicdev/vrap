import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import { Status } from '../../networking/types';
import Store from './store';

class InProgressDealBarViewModel {
  readonly statusText: string = 'Purchase\xa0in\xa0progress';
  readonly buttonText: string = 'RESUME PURCHASE';

  private store: Store;
  private currencyFormatter: Intl.NumberFormat;
  private analyticsHandler: AnalyticsHandler;

  constructor(store: Store) {
    this.store = store;
    this.currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleMount(): void {
    this.store.initClientSide();
  }

  show(): boolean {
    return this.store.inProgressDealStatus === Status.SUCCESS;
  }

  yearMakeModel(): string {
    const {
      make,
      model,
      year,
    } = this.store.inProgressDeal.dealSummary.inventory.vehicle;
    return `${year} ${make} ${model}`;
  }

  trim(): string {
    const { trim } = this.store.inProgressDeal.dealSummary.inventory.vehicle;
    return trim;
  }

  price(): string {
    const {
      listPrice,
    } = this.store.inProgressDeal.dealSummary.inventory.pricing;
    return this.currencyFormatter.format(listPrice);
  }

  // TODO: 'step' and all the cases in the switch should use an enum.
  // We need to export an enum from the networking library for deals.
  private getResumeStepHref(step: string, vin: string): string {
    switch (step) {
      case 'TradeIn':
        return `/e2e/${vin}/checkoutTradeIn`;
      case 'RegistrationAddress':
        return `/e2e/${vin}/registration`;
      case 'DeliveryAddress':
        return `/e2e/${vin}/delivery-form`;
      case 'Financing':
        return `/e2e/${vin}/vroomFinancing`;
      case 'PaymentType':
        return `/e2e/${vin}/payment`;
      case 'DepositPaymentInfo':
        return `/e2e/${vin}/dealReview`;
      case 'DealSummary':
        return `/deal/${vin}/congratulations`;
      case 'FinancingOption':
        return `/e2e/${vin}/autofi`;
      case 'FinancingPending':
        return `/e2e/${vin}/autofi`;
      case 'BackendProducts':
        return `/e2e/${vin}/dealCoverage`;
      case 'Review':
        return `/e2e/${vin}/dealReview`;
      case 'DocumentUpload':
        return `/e2e/${vin}/documentUpload`;
      case 'TradeInLoanInfo':
        return `/e2e/${vin}/tradeInLoanInfo`;
      default:
        // If we got an unexpected step, link to the transactions page as a fallback.
        return '/my-account/transactions';
    }
  }

  handleButtonClick(): void {
    this.analyticsHandler.trackTransactionResumeClicked();
    const { step } = this.store.inProgressDeal.dealSummary.dealStatus;
    const { vin } = this.store.inProgressDeal.dealSummary.inventory.vehicle;
    const href = this.getResumeStepHref(step, vin);
    window.location.href = href;
  }
}

export default InProgressDealBarViewModel;
