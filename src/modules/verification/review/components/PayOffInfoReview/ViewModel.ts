import Store from 'src/store';

export default class PayOffInfoReviewViewModel {
  readonly payOfftitle: string = 'Auto Loan Information';
  readonly carPayment: string = 'Are you making car payments?';
  readonly whereCarPayment: string = 'Where do you make your car payments?';
  readonly loanAccountNumber: string = 'Loan Account Number';
  readonly ssnLastFour: string = 'Last Four Digits of Social Security Number';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
