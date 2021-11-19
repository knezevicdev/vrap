import { Stepper } from 'src/interfaces.d';
import Store from 'src/store';

class VerificationStepperViewModel {
  constructor(private store: Store) {}
  readonly defaultSteps: Stepper[] = [
    {
      step: '1',
      progress: '25',
      next: 'Document upload',
      title: 'Verify Your Info',
    },
    {
      step: '2',
      progress: '50',
      next: 'Review your information',
      title: 'Additional Docs',
    },
    {
      step: '3',
      progress: '75',
      next: 'Payment Method',
      title: 'Review',
    },
    {
      step: '4',
      progress: '100',
      next: 'Your Information is submitted',
      title: 'Payment Method',
    },
  ];

  readonly paymentRequiredSteps: Stepper[] = [
    {
      step: '1',
      progress: '25',
      next: 'Document upload',
      title: 'Verify Your Info',
    },
    {
      step: '2',
      progress: '50',
      next: 'Review your information',
      title: 'Additional Docs',
    },
    {
      step: '3',
      progress: '75',
      next: 'Review',
      title: 'Payment Method',
    },
    {
      step: '4',
      progress: '100',
      next: 'Your Information is submitted',
      title: 'Review',
    },
  ];

  isPaymentRequireExp = (): boolean => {
    return this.store.absmart.isInExperiment('ac-payment-required');
  };
}

export default VerificationStepperViewModel;
