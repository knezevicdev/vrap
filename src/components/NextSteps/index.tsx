import React from 'react';

import View from './View';
import ViewAB from './ViewAB';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/store/appStore';
const NextSteps: React.FC = () => {
  const viewModel = new ViewModel();
  const appStore = useAppStore();
  return appStore.offerFacelift ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default NextSteps;
