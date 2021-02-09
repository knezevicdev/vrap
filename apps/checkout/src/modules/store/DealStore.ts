import { createContext } from 'react';
import { observable, makeObservable } from 'mobx';
import { GQLTypes } from '@vroom-web/networking';

export class DealStore {
  steps: string[] = [];
  activeStep: number = 2;
  deal: GQLTypes.Deal = {} as GQLTypes.Deal;

  constructor() {
    makeObservable(this, {
      steps: observable,
      activeStep: observable,
      deal: observable,
    });
  }
}

export const DealContext = createContext(new DealStore());
