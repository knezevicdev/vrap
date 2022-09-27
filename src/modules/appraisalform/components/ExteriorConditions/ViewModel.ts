import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  constructor(private _store: Store) {}

  get isRemoveMilesOnTiresExperiment(): boolean {
    return this._store.absmart.isInExperiment(
      'appraisal-form-miles-on-tires-removed'
    );
  }
}
