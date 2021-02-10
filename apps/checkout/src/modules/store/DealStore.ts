import { GQLTypes } from '@vroom-web/networking';
import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

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
  showDropdown: boolean = false;

  constructor(activeStep: number, showDropdown: boolean, deal?: GQLTypes.Deal) {
    makeAutoObservable(this);
    this.activeStep = activeStep;
    this.showDropdown = showDropdown;
    this.deal = deal;
  }

  toggleDropdown = (): void => {
    this.showDropdown = !this.showDropdown;
  };
}

export const DealContext = createContext(new DealStore(-1, false));
