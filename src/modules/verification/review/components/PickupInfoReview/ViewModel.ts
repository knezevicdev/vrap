import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly pickUpInfotitle: string = 'Pick Up Information';
  readonly pickUpAddress: string = 'Pick up address';
  readonly contactInformation: string = 'Contact Information';
  readonly name: string = 'Name';
  readonly phoneNumber: string = 'Phone Number';
  readonly email: string = 'Email';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/verification/owner/${this.store.verification.offerId}`;
  }
}
