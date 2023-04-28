import Store from 'src/store';

export default class PayOffInfoReviewViewModel {
  constructor(private store: Store) {}

  handleEditClick(): void {
    localStorage.setItem('review_edit_section', '2');
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }

  getCurrentPayment(): string {
    const value = this.store.verification.verificationDetail?.current_payments;
    return value ? 'Yes' : 'No';
  }
}
