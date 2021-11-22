import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly personalInformationInfotitle: string = 'Your Information';
  readonly name: string = 'Name';
  readonly email: string = 'Email Address';
  readonly phoneNumber: string = 'Phone Number';
  readonly zipCode: string = 'Zip Code';
  readonly edit: string = 'Edit';

  constructor(private _store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/vehicleInformation/${this._store.appraisal?.appraisalDetail?.vehicleInfoForm?.vin}#personalinformation`;
  }
}
