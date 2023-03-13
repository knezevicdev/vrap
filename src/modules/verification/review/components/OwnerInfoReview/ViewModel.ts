import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

import Store from 'src/store';

export default class OwnerInfoReviewViewModel {
  readonly title: string = 'Contact Information';
  readonly primarySectionTitle: string = "Primary Owner's Information";
  readonly secondarySectionTitle: string = "Secondary Owner's Information";
  readonly name: string = 'Name';
  readonly email: string = 'Email';
  readonly phone: string = 'Phone';
  readonly address: string = 'Address';
  readonly edit: string = 'Edit';

  constructor(private store: Store, private absmartly: ABSmartlyContextValue) {}

  handleEditClick(): void {
    const { values, address, submittedType, priceId } = this.store.payment;
    const { mutationInput } = this.store.deposit;
    const localPaymentValue = localStorage.getItem('review_payment_values');
    const hasValue =
      !localPaymentValue &&
      this.absmartly.isInExperiment('ac-payment-required');
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
    localStorage.setItem('review_edit_section', '0');
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
