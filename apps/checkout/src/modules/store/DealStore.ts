import { GQLTypes } from '@vroom-web/networking';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { VehicleProps } from '../deals/sections/DealSummary/types';

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
  deal?: GQLTypes.Deal;
  vehicle?: VehicleProps;
  showDropdown = false;

  constructor(
    activeStep: number,
    showDropdown: boolean,
    deal?: GQLTypes.Deal,
    vehicle?: VehicleProps
  ) {
    makeAutoObservable(this);
    this.activeStep = activeStep;
    this.showDropdown = showDropdown;
    this.deal = deal;
    this.vehicle = vehicle;
  }

  toggleDropdown = (): void => {
    this.showDropdown = !this.showDropdown;
  };
}

export const DealContext = createContext(new DealStore(-1, false));
