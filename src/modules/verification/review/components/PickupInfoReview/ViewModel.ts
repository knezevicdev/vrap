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
    localStorage.setItem('review_edit_section', '1');
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
