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

export const progressBar: React.FC = (props: any) => {
  return <ProgressBar steps={props.steps} activeStep={props.activeStep} />;
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
