import { GQLTypes } from '@vroom-web/networking';
import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
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
  activeStep: number = -1;
  deal?: GQLTypes.Deal;
  vehicle?: VehicleProps;
  showDropdown: boolean = false;

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
