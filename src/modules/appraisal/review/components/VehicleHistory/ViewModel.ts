import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly vehicleHistoryInfotitle: string = 'Vehicle History';
  readonly accident: string = 'Accident';
  readonly title: string = 'Title';
  readonly edit: string = 'Edit';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/vehicleInformation/${this.store.appraisal?.appraisalDetail?.vehicleInfoForm?.vin}#vehiclehistory`;
  }
}
