import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly exteriorConditionInfotitle: string = 'Exterior Condition';
  readonly exteriorCondition: string = 'Exterior Condition';
  readonly hailDamage: string = 'Hail Damage';
  readonly tiresAndWheels: string = 'Tires and Wheels';
  readonly afterMarket: string = 'Aftermarket Modifications';
  readonly rust: string = 'Rust';
  readonly dents: string = 'Dents';
  readonly paintChipping: string = 'Paint Chipping';
  readonly scratches: string = 'Scratches';
  readonly edit: string = 'Edit';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/vehicleInformation/${this.store.appraisal?.appraisalDetail?.vehicleInfoForm?.vin}#exteriorondition`;
  }
}
