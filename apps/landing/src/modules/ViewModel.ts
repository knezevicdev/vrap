import Model from './Model';
import { LandingProps } from './View';

class LandingViewModel implements LandingProps {
  model: Model;
  constructor(model: Model) {
    this.model = model;
  }
  showVariant = (): boolean =>
    Boolean(
      this.model &&
        this.model.experiment &&
        this.model.experiment.assignedVariant === 1
    );
}
export default LandingViewModel;
