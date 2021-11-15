import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Prop {
  activeStep: string;
}

const VerificationStepper: React.FC<Prop> = ({ activeStep }) => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} activeStep={activeStep} />;
};

export default VerificationStepper;
