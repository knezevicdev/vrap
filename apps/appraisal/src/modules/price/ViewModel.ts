import { PriceStore } from './store';

class PriceViewModel {
  readonly automatedAppraisal: boolean;

  constructor(store: PriceStore) {
    this.automatedAppraisal = store.automatedAppraisal;
  }
}

export default PriceViewModel;
