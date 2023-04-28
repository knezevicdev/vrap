import Store from 'src/store';

export default class OwnerInfoReviewViewModel {
  constructor(private store: Store) {}

  handleEditClick(): void {
    localStorage.setItem('review_edit_section', '0');
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
