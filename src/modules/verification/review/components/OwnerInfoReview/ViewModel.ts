import Store from 'src/store';

export default class OwnerInfoReviewViewModel {
  readonly title: string = 'Contact Information';
  readonly primarySectionTitle: string = "Primary Owner's Information";
  readonly secondarySectionTitle: string = "Secondary Owner's Information";
  readonly name: string = 'Name';
  readonly email: string = 'Email';
  readonly phone: string = 'Phone';
  readonly address: string = 'Address';
  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
