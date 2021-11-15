import { ABSmartlyModel } from '@vroom-web/absmartly-integration';
import { makeAutoObservable } from 'mobx';

export class ABSmartStore {
  abSmartlyModel?: ABSmartlyModel;
  stepperAbTest = false;
  abTestFacelift = false;
  offerFacelift = false;
  inProgressiveTest = false;
  paymentRequired = false;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setABSmartlyModel(abSmartlyModel: ABSmartlyModel): void {
    this.abSmartlyModel = abSmartlyModel;
  }

  setABSmartTest = (value: boolean): void => {
    this.stepperAbTest = value;
  };

  setFaceliftAbTest = (value: boolean): void => {
    this.abTestFacelift = value;
  };

  setOfferFacelift = (value: boolean): void => {
    this.offerFacelift = value;
  };

  setProgressiveTest = (value: boolean): void => {
    this.inProgressiveTest = value;
  };

  setPaymentRequired = (value: boolean): void => {
    this.paymentRequired = value;
  };

  setLoading = (value: boolean): void => {
    this.loading = value;
  };
}
