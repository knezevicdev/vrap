import Store from 'src/store';

export default class VehicleHistoryViewModel {
  constructor(private _store: Store) {}

  isLienholderQuestionExperiment = (): boolean => {
    return this._store.absmart.isInExperiment('ac-lienholder-question');
  };
}
