import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  constructor(private store: Store) {}

  handleEditClick(): void {
    localStorage.setItem('review_edit_section', '1');
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
