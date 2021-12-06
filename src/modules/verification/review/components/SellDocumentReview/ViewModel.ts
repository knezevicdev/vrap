import Store from 'src/store';

export default class SellDocumentReviewViewModel {
  readonly SellDoctitle: string = 'Document Upload';
  readonly frontTitle: string = 'Front of Title Information';
  readonly backTitle: string = 'Back of Title Information';
  readonly lienRelease: string = 'Lien Release Letter';
  readonly exactMileage: string = 'Exact Mileage';
  readonly dlFront: string = "Front of Driver's License";
  readonly dlBack: string = "Back of Driver's License";
  readonly secondDlFront: string = "Front of Second Owner's Driver's License";
  readonly secondDlBack: string = "Back of Second Owner's Driver's License";
  readonly tiFront: string = 'Front of Title Information';
  readonly tiBack: string = 'Back of Title Information';
  readonly registration: string = 'Registration';
  readonly odometer: string = 'Odometer Picture';

  constructor(private store: Store) {}

  isPaymentRequireExp = (): boolean => {
    return this.store.absmart.isInExperiment('ac-payment-required');
  };

  handleEditClick(): void {
    const { values, address, submittedType, priceId } = this.store.payment;
    const { mutationInput } = this.store.deposit;
    const localPaymentValue = localStorage.getItem('review_payment_values');
    if ((mutationInput || values) && !localPaymentValue) {
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
    if (this.isPaymentRequireExp()) {
      localStorage.setItem('review_doc_section', 'doc_upload');
    }
    window.location.href = `/sell/verification/documents/${this.store.verification.offerId}`;
  }
}
