import { GQLTypes } from '@vroom-web/networking';
import { createContext } from 'react';

const steps = [
  'Trade-In Info',
  'Your Info',
  'Payment Details',
  'Finalize Purchase',
  'Deposit',
  'Additional Docs',
];
const activeStep = -1;

interface DealState {
  steps: string[];
  activeStep: number;
  deal?: GQLTypes.Deal;
}

export const DealContext = createContext<DealState>({
  steps,
  activeStep,
});
