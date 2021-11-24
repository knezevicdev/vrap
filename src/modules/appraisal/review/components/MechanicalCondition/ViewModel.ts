import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly mechanicalConditionInfotitle: string = 'Mechanical Condition';
  readonly runnable: string = 'Vehicle Runs';
  readonly mechanicalCondition: string = 'Mechanical Condition';
  readonly warningLights: string = 'Active Warning Lights';
  readonly floodFireDamage: string = 'Water or Fire Damage';
  readonly additionalDetails: string = 'Additional Information';
  readonly edit: string = 'Edit';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/vehicleInformation/${this.store.appraisal?.vehicleInfoForm?.vin}#mechanicalcondition`;
  }
}
