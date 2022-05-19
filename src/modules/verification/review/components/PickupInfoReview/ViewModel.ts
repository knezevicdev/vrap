import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly pickUpInfotitle: string = 'Pick Up Information';
  readonly pickUpAddress: string = 'Pick up address';
  readonly contactInformation: string = 'Contact Information';
  readonly name: string = 'Name';
  readonly phoneNumber: string = 'Phone Number';
  readonly email: string = 'Email';
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
    localStorage.setItem('review_edit_section', '1');
    window.location.href = `/appraisal/verification/owner?priceId=${this.store.verification.offerId}`;
  }
}
