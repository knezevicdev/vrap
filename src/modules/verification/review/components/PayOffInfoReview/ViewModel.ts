import Store from 'src/store';

export default class PayOffInfoReviewViewModel {
  readonly payOfftitle: string = 'Auto Loan Information';
  readonly carPayment: string = 'Are you making car payments?';
  readonly whereCarPayment: string = 'Where do you make your car payments?';
  readonly loanAccountNumber: string = 'Loan Account Number';
  readonly ssnLastFour: string = 'Last Four Digits of Social Security Number';
  readonly edit: string = 'Edit';

  constructor(private store: Store) {}

  handleEditClick(): void {
    const { values, address, submittedType, priceId } = this.store.payment;
    const { mutationInput } = this.store.deposit;
    const localPaymentValue = localStorage.getItem('review_payment_values');
    const hasValue =
      !localPaymentValue &&
      this.store.absmart.isInExperiment('ac-payment-required');
    if ((mutationInput || values) && hasValue) {
      const reviewPaymentValue = mutationInput
        ? mutationInput
        : {
            values,
            address,
            priceId,
            submittedType,
          };
      const paymentType = mutationInput ? 'ach' : 'manual';
      localStorage.setItem(
        'review_payment_values',
        JSON.stringify(reviewPaymentValue)
      );
      localStorage.setItem('review_payment_type', paymentType);
    }
    localStorage.setItem('review_edit_section', '2');
    window.location.href = `/appraisal/verification/owner?priceId=${this.store.verification.offerId}`;
  }

  getCurrentPayment(): string {
    const value = this.store.verification.verificationDetail?.current_payments;
    return value ? 'Yes' : 'No';
  }
}
