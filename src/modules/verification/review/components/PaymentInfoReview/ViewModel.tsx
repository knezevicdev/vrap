import Store from 'src/store';

export default class PaymentInfoReviewViewModel {
  readonly title: string = 'Payment Method';
  readonly address: string = 'Address';
  readonly edit: string = 'Edit';
  readonly methodOfPayment: string = 'Method of Payment';
  readonly selectedBank = 'Selected Bank';
  readonly accountForDeposit = 'Account for Deposit';
  readonly bankRoutingNumber = 'Bank Routing Number';
  readonly directDeposit = 'Direct Deposit';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/appraisal/paymentmethod?priceId=${this.store.verification.offerId}`;
  }
}
