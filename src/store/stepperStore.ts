import { makeAutoObservable } from 'mobx';

export interface StepModel {
  step: string;
  progress: string;
  next: string;
  title: string;
}

export class StepperStore {
  steps: StepModel[] = [
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

  currentStep = this.steps[0];

  constructor() {
    makeAutoObservable(this);
  }

  setStep = (step: number): void => {
    this.currentStep = this.steps[step];
  };
}
