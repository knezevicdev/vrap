import Store from 'src/store';

export default class ExteriorConditionsViewModel {
  constructor(private store: Store) {}

  isDetailedConditionsExperiment = (): boolean => {
    return this.store.absmart.isInExperiment(
      'appraisal-detailed-condition-questions'
    );
  };
}
