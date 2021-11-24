import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly interiorConditionInfotitle: string = 'Interior Condition';
  readonly interiorMaterial: string = 'Interior Material';
  readonly interiorCondition: string = 'Interior Condition';
  readonly odor: string = 'Odor';
  readonly edit: string = 'Edit';

  constructor(private _store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/vehicleInformation/${this._store.appraisal?.appraisalDetail?.vehicleInfoForm?.vin}#interiorcondition`;
  }
}
