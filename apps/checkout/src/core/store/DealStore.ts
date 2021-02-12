import { GQLTypes } from '@vroom-web/networking';
import { makeAutoObservable } from 'mobx';

import { VehicleProps } from 'src/modules/deals/sections/DealSummary/types';

export interface DealState {
  activeStep: number;
  showDropdown: boolean;
  deal: GQLTypes.Deal;
  vehicle: VehicleProps;
}

export class DealStore {
  steps: string[] = [
    'Trade-In Info',
    'Your Info',
    'Payment Details',
    'Finalize Purchase',
    'Deposit',
    'Additional Docs',
  ];
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
