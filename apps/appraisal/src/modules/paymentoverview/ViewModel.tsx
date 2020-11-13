import { PaymentOverviewStore } from './store';

const displayCurrency = (num: number): string => {
  return '$' + Math.round(num).toLocaleString();
};

class PaymentOverviewViewModel {
  private readonly store: PaymentOverviewStore;
  readonly hero: string = 'payment overview';
  readonly carWorth: string = 'Your car is worth';
  readonly remainingLoan: string = 'Remaining Loan';
  readonly total: string = 'Total';
  readonly isDesktop: boolean = true;

  constructor(store: PaymentOverviewStore, isDeskTop: boolean) {
    this.store = store;
    this.isDesktop = isDeskTop;
    this.store.setDisplayBody(isDeskTop);
  }

  getCarWorthPrice = (): string => {
    return displayCurrency(this.store.price);
  };

  getDisplayBody = (): boolean => {
    return this.store.displayBody;
  };

  toggleBody = (): void => {
    this.store.setDisplayBody(!this.store.displayBody);
    //this.displayBody = this.store.displayBody;
  };
}

export default PaymentOverviewViewModel;
