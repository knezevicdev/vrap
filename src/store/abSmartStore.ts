import { ABSmartlyModel } from '@vroom-web/absmartly-integration';
import { Status } from '@vroom-web/networking';
import { makeAutoObservable } from 'mobx';

export class ABSmartStore {
  abSmartlyModel?: ABSmartlyModel;
  abTestFacelift = false;
  inProgressiveTest = false;
  inPriceProgressiveTest = false;
  inCongratsProgressiveTest = false;

  constructor() {
    makeAutoObservable(this);
  }

  setABSmartlyModel(abSmartlyModel: ABSmartlyModel): void {
    this.abSmartlyModel = abSmartlyModel;
  }

  get isABSmartlyLoading(): boolean {
    return (
      !this.abSmartlyModel ||
      this.abSmartlyModel?.status === Status.INITIAL ||
      this.abSmartlyModel?.status === Status.LOADING
    );
  }

  isInExperiment(experimentID: string): boolean {
    return this.abSmartlyModel?.inExperiment(experimentID) === true;
  }
}
