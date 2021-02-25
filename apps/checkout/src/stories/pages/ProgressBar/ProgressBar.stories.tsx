import React from 'react';

import ProgressBar from '../../../modules/common/ProgressBar';

const muckSteps = [
  'Trade-in info',
  'Your info',
  'Payment details',
  'Finalize purchase',
  'Deposit',
  'Additionla docs',
];

interface Props {
  steps: string[];
  activeStep: number;
}

export const progressBar = ({ steps, activeStep }: Props): JSX.Element => {
  return <ProgressBar steps={steps} activeStep={activeStep} />;
};

export default {
  title: 'Checkout/ProgressBar',
  component: progressBar,
  argTypes: {
    steps: {
      control: {
        type: 'array',
        value: muckSteps,
      },
      defaultValue: muckSteps,
    },
    activeStep: {
      control: {
        type: 'select',
        options: muckSteps.map((_, i) => i + 1),
      },
      defaultValue: 2,
    },
  },
};
