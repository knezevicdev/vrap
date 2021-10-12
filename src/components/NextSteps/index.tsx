import React from 'react';

import View from './View';
import ViewAB from './ViewAB';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const NextSteps: React.FC = () => {
  const viewModel = new ViewModel();
  const { store } = useAppStore();
  return store.absmart.offerFacelift ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default NextSteps;
