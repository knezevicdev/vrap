import Store from 'src/store';

export default class SellDocumentReviewViewModel {
  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/verification/documents/${this.store.verification.offerId}`;
  }
}
