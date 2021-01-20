import { Experiment } from '@vroom-web/experiment-sdk';
import { action, observable } from 'mobx';

import experimentSDK from './integrations/experimentSDK';

class LandingModel {
  @observable experiment?: Experiment = undefined;
  @action
  setExperiment = (experiment?: Experiment): void => {
    this.experiment = experiment;
  };

  constructor() {
    experimentSDK
      .getAndLogExperimentClientSide('delta-mm-landing-exp1')
      .then(this.setExperiment);
  }
}
export default LandingModel;
