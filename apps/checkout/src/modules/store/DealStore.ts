import { GQLTypes } from '@vroom-web/networking';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { VehicleProps } from '../deals/sections/DealSummary/types';

export interface DealState {
  activeStep: number;
  showDropdown: boolean;
  deal: GQLTypes.Deal;
  vehicle: VehicleProps;
}

export class DealStore {
  activeStep = -1;
  deal: GQLTypes.Deal = {} as GQLTypes.Deal;
  vehicle: VehicleProps = {} as VehicleProps;
  showDropdown = false;

  constructor(dealState?: DealState) {
    makeAutoObservable(this);
    if (dealState) {
      this.activeStep = dealState.activeStep;
      this.showDropdown = dealState.showDropdown;
      this.deal = dealState.deal;
      this.vehicle = dealState.vehicle;
    }
  }

  toggleDropdown = (): void => {
    this.showDropdown = !this.showDropdown;
  };
}

export const DealContext = createContext<DealStore>(new DealStore());
