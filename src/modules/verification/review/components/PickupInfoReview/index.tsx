import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const PickupInfoReview: React.FC = () => {
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(store, absmartly);
  return <View viewModel={viewModel} store={store} />;
};

export default PickupInfoReview;
